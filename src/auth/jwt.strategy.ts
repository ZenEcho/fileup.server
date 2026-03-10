import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { OAuthProvider, UserStatus } from '../prisma/prisma-client';
import { MailVerificationPolicyService } from '../system-settings/mail-verification-policy.service';
import { UsersService } from '../users/users.service';

interface JwtPayload {
  sub: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
    private readonly mailVerificationPolicyService: MailVerificationPolicyService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secretKey',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.sub);
    if (!user || user.status !== UserStatus.ACTIVE) {
      return null;
    }

    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();

    const authProviders = this.resolveAuthProviders({
      githubId: user.githubId,
      passwordHash: user.passwordHash,
      oauthAccounts: user.oauthAccounts || [],
    });

    const authProvider =
      authProviders.length === 1
        ? authProviders[0]
        : authProviders.length > 1
          ? 'MIXED'
          : 'LOCAL';

    const verificationRequiredNow =
      this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(
        user,
        mailVerificationEnforced,
      );

    const status = this.mailVerificationPolicyService.resolveAccountStatus(
      user,
      mailVerificationEnforced,
    );

    return {
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      avatar: user.avatar,
      email: user.email,
      pendingEmail: user.pendingEmail,
      pendingEmailPurpose: user.pendingEmailPurpose,
      emailVerified: Boolean(user.emailVerifiedAt),
      emailVerifyRequired: user.emailVerifyRequired,
      mailEnabled: mailVerificationEnforced,
      emailVerificationEnforced: mailVerificationEnforced,
      verificationRequiredNow,
      authProvider,
      accountType: authProvider,
      authProviders,
      status,
      lastLoginAt: user.lastLoginAt,
    };
  }

  private resolveAuthProviders(input: {
    githubId: string | null;
    passwordHash: string | null;
    oauthAccounts: Array<{ provider: OAuthProvider; isActive?: boolean }>;
  }) {
    const providers: Array<'LOCAL' | 'GITHUB' | 'GOOGLE'> = [];

    if (input.passwordHash) {
      providers.push('LOCAL');
    }

    if (
      input.githubId ||
      input.oauthAccounts.some(
        (item) =>
          item.provider === OAuthProvider.GITHUB && item.isActive !== false,
      )
    ) {
      providers.push('GITHUB');
    }

    if (
      input.oauthAccounts.some(
        (item) =>
          item.provider === OAuthProvider.GOOGLE && item.isActive !== false,
      )
    ) {
      providers.push('GOOGLE');
    }

    return providers;
  }
}
