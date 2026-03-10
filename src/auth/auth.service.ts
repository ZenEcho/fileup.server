import {
  BadRequestException,
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from '../prisma/prisma-client';
import { CaptchaService } from '../system-settings/captcha.service';
import { MailVerificationPolicyService } from '../system-settings/mail-verification-policy.service';
import { UsersService } from '../users/users.service';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailVerificationService } from './email-verification.service';
import { PasswordService } from './password.service';

export type OAuthProviderType = 'GITHUB' | 'GOOGLE';

export interface OAuthProfile {
  id: string;
  username: string;
  avatar: string | null;
  email: string | null;
  emailVerified?: boolean;
}

interface UserPayload {
  id: string;
  username: string;
  role: string;
}

interface OauthBindStatePayload {
  mode: 'OAUTH_BIND';
  provider: OAuthProviderType;
  sub: string;
  iat: number;
  exp: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,32}$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;
const OAUTH_BIND_STATE_PREFIX = 'bind:';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly captchaService: CaptchaService,
    private readonly mailVerificationPolicyService: MailVerificationPolicyService,
  ) {}

  async validateOAuthUser(
    provider: OAuthProviderType,
    profile: OAuthProfile,
  ): Promise<UserPayload> {
    const user = await this.usersService.findOrCreateByOAuth({
      provider,
      providerUserId: profile.id,
      username: profile.username,
      avatar: profile.avatar,
      email: profile.email,
      emailVerified: Boolean(profile.emailVerified),
    });

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is disabled');
    }

    await this.usersService.touchLastLogin(user.id);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  async handleOAuthLogin(provider: OAuthProviderType, profile: OAuthProfile) {
    const payload = await this.validateOAuthUser(provider, profile);
    return this.login(payload);
  }

  async handleGithubLogin(profile: OAuthProfile) {
    return this.handleOAuthLogin('GITHUB', profile);
  }

  async handleGoogleLogin(profile: OAuthProfile) {
    return this.handleOAuthLogin('GOOGLE', profile);
  }

  async createOAuthBindAuthorization(
    userId: string,
    provider: OAuthProviderType,
  ) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is disabled');
    }

    if (!user.passwordHash) {
      throw new BadRequestException(this.resolveLocalOnlyError(provider));
    }

    const isBound = await this.usersService.isOAuthProviderBound(
      userId,
      provider,
    );
    if (isBound) {
      throw new ConflictException(this.resolveAlreadyBoundError(provider));
    }

    const token = this.jwtService.sign(
      {
        mode: 'OAUTH_BIND',
        provider,
        sub: user.id,
      },
      {
        expiresIn: '10m',
      },
    );
    const state = `${OAUTH_BIND_STATE_PREFIX}${token}`;

    const backendBase = (
      process.env['BACKEND_PUBLIC_URL'] || 'http://localhost:3000/api'
    ).replace(/\/$/, '');

    return {
      authorizeUrl: `${backendBase}/auth/${provider.toLowerCase()}?state=${encodeURIComponent(state)}`,
      provider,
    };
  }

  async createGithubBindAuthorization(userId: string) {
    return this.createOAuthBindAuthorization(userId, 'GITHUB');
  }

  async createGoogleBindAuthorization(userId: string) {
    return this.createOAuthBindAuthorization(userId, 'GOOGLE');
  }

  async bindOAuthAccountWithState(
    state: string,
    provider: OAuthProviderType,
    profile: OAuthProfile,
  ) {
    const payload = this.verifyOAuthBindState(state);

    if (payload.provider !== provider) {
      throw new UnauthorizedException('OAUTH_BIND_STATE_PROVIDER_MISMATCH');
    }

    return this.usersService.bindOAuthAccount(payload.sub, {
      provider,
      providerUserId: profile.id,
      username: profile.username,
      avatar: profile.avatar,
      email: profile.email,
      emailVerified: Boolean(profile.emailVerified),
    });
  }

  async bindGithubAccountWithState(state: string, profile: OAuthProfile) {
    return this.bindOAuthAccountWithState(state, 'GITHUB', profile);
  }

  async bindGoogleAccountWithState(state: string, profile: OAuthProfile) {
    return this.bindOAuthAccountWithState(state, 'GOOGLE', profile);
  }
  isOAuthBindState(rawState: string) {
    const state = rawState.trim();
    if (!state) {
      return false;
    }

    if (state.startsWith(OAUTH_BIND_STATE_PREFIX)) {
      return true;
    }

    const decoded =
      this.jwtService.decode<Partial<OauthBindStatePayload> | null>(state);

    return Boolean(
      decoded &&
      decoded.mode === 'OAUTH_BIND' &&
      typeof decoded.sub === 'string' &&
      (decoded.provider === 'GITHUB' || decoded.provider === 'GOOGLE'),
    );
  }

  verifyOAuthBindState(rawState: string): OauthBindStatePayload {
    const state = rawState.trim();
    if (!state) {
      throw new BadRequestException('OAUTH_BIND_STATE_REQUIRED');
    }
    const token = state.startsWith(OAUTH_BIND_STATE_PREFIX)
      ? state.slice(OAUTH_BIND_STATE_PREFIX.length)
      : state;

    try {
      const payload = this.jwtService.verify<OauthBindStatePayload>(token);
      if (payload.mode !== 'OAUTH_BIND' || !payload.sub || !payload.provider) {
        throw new UnauthorizedException('OAUTH_BIND_STATE_INVALID');
      }
      return payload;
    } catch {
      throw new UnauthorizedException('OAUTH_BIND_STATE_INVALID');
    }
  }

  verifyGithubBindState(rawState: string): string {
    const payload = this.verifyOAuthBindState(rawState);
    if (payload.provider !== 'GITHUB') {
      throw new UnauthorizedException('GITHUB_BIND_STATE_INVALID');
    }
    return payload.sub;
  }

  async register(payload: RegisterDto, clientIp?: string) {
    const username = this.normalizeUsername(payload.username);
    const email = this.normalizeEmail(payload.email);
    const password = this.normalizePassword(payload.password);

    this.validateRegisterInput(username, email, password);

    await this.captchaService.validateCaptcha(
      'register',
      payload.captchaToken,
      clientIp,
    );

    const [existingByEmail, existingByUsername] = await Promise.all([
      this.usersService.findByEmail(email),
      this.usersService.findByUsername(username),
    ]);

    if (existingByEmail) {
      throw new ConflictException('Email already in use');
    }

    if (existingByUsername) {
      throw new ConflictException('Username already in use');
    }

    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();

    const passwordHash = await this.passwordService.hashPassword(password);
    const user = await this.usersService.createLocalUser({
      username,
      email,
      passwordHash,
      emailVerifyRequired: mailVerificationEnforced,
    });

    if (!mailVerificationEnforced) {
      return {
        verificationSent: false,
        requiresEmailVerification: false,
        email: this.maskEmail(email),
        expiresAt: null,
        mailEnabled: false,
        emailVerificationEnforced: false,
        verificationRequiredNow: false,
      };
    }

    try {
      const result =
        await this.emailVerificationService.sendVerificationForUser({
          userId: user.id,
          email,
          username,
        });

      return {
        ...result,
        mailEnabled: true,
        emailVerificationEnforced: true,
        verificationRequiredNow: true,
      };
    } catch (error) {
      await this.usersService.deleteById(user.id).catch(() => {
        return null;
      });

      throw new ServiceUnavailableException(
        `Registration succeeded but sending verification email failed: ${(error as Error).message}`,
      );
    }
  }

  async loginWithPassword(payload: LoginDto, clientIp?: string) {
    const rawIdentifier = this.normalizeIdentifier(payload.identifier);
    const password = this.normalizePassword(payload.password);

    if (!rawIdentifier || !password) {
      throw new BadRequestException('identifier and password are required');
    }

    this.validatePassword(password);

    await this.captchaService.validateCaptcha(
      'login',
      payload.captchaToken,
      clientIp,
    );

    const loginByEmail = rawIdentifier.includes('@');
    const identifier = loginByEmail
      ? rawIdentifier.toLowerCase()
      : rawIdentifier;

    const candidates = await this.usersService.findLocalLoginCandidates(
      identifier,
      loginByEmail,
    );

    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();

    for (const candidate of candidates) {
      if (!candidate.passwordHash) {
        continue;
      }

      const matched = await this.passwordService.verifyPassword(
        password,
        candidate.passwordHash,
      );

      if (!matched) {
        continue;
      }

      if (candidate.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('Account is disabled');
      }

      if (
        this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(
          candidate,
          mailVerificationEnforced,
        )
      ) {
        throw new UnauthorizedException(
          'Email is not verified. Please verify your email first.',
        );
      }

      await this.usersService.touchLastLogin(candidate.id);

      return this.login({
        id: candidate.id,
        username: candidate.username,
        role: candidate.role,
      });
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async verifyEmailByToken(token: string) {
    const result = await this.emailVerificationService.verifyByToken(token);
    return this.issueTokenAfterVerification(result);
  }

  async verifyEmailByCode(email: string, code: string) {
    const result = await this.emailVerificationService.verifyByCode(
      email,
      code,
    );
    return this.issueTokenAfterVerification(result);
  }

  resendEmailVerification(email: string) {
    return this.emailVerificationService.resend(email);
  }

  confirmPasswordReset(payload: ConfirmPasswordResetDto) {
    return this.usersService.confirmPasswordReset(payload);
  }

  getCaptchaConfig() {
    return this.captchaService.getPublicConfig();
  }

  login(user: UserPayload) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async issueTokenAfterVerification(result: {
    verified: boolean;
    email: string;
    userId: string;
    purpose: string;
  }) {
    const user = await this.usersService.findOne(result.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is disabled');
    }

    await this.usersService.touchLastLogin(user.id);

    return {
      ...result,
      ...this.login({
        id: user.id,
        username: user.username,
        role: user.role,
      }),
    };
  }

  private validateRegisterInput(
    username: string,
    email: string,
    password: string,
  ) {
    if (!username || !email || !password) {
      throw new BadRequestException(
        'username, email and password are required',
      );
    }

    if (!USERNAME_PATTERN.test(username)) {
      throw new BadRequestException(
        'username must be 3-32 chars and only contain letters, numbers, _ or -',
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      throw new BadRequestException('invalid email format');
    }

    this.validatePassword(password);
  }

  private validatePassword(password: string) {
    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      throw new BadRequestException(
        `password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters`,
      );
    }
  }

  private maskEmail(email: string) {
    const [name, domain] = email.split('@');
    if (!name || !domain) {
      return '***';
    }

    if (name.length <= 2) {
      return `${name[0] || '*'}***@${domain}`;
    }

    return `${name.slice(0, 2)}***@${domain}`;
  }

  private resolveLocalOnlyError(provider: OAuthProviderType) {
    return provider === 'GITHUB'
      ? 'USER_GITHUB_BIND_LOCAL_ONLY'
      : 'USER_GOOGLE_BIND_LOCAL_ONLY';
  }

  private resolveAlreadyBoundError(provider: OAuthProviderType) {
    return provider === 'GITHUB'
      ? 'USER_GITHUB_ALREADY_BOUND'
      : 'USER_GOOGLE_ALREADY_BOUND';
  }

  private normalizeUsername(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
  }

  private normalizeEmail(value: unknown) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
  }

  private normalizeIdentifier(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
  }

  private normalizePassword(value: unknown) {
    return typeof value === 'string' ? value : '';
  }
}
