import {
  BadRequestException,
  INestApplication,
  Module,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { EmailVerificationService } from '../src/auth/email-verification.service';
import { PasswordService } from '../src/auth/password.service';
import { CaptchaService } from '../src/system-settings/captcha.service';
import { MailVerificationPolicyService } from '../src/system-settings/mail-verification-policy.service';
import { UsersService } from '../src/users/users.service';

interface MemoryUser {
  id: string;
  githubId: string | null;
  username: string;
  email: string | null;
  passwordHash: string | null;
  role: 'DEVELOPER' | 'ADMIN';
  status: 'ACTIVE' | 'DISABLED';
  avatar: string | null;
  emailVerifiedAt: Date | null;
  emailVerifyRequired: boolean;
  lastVerificationSentAt: Date | null;
}

class InMemoryUsersService {
  private users = new Map<string, MemoryUser>();
  private idSeq = 1;

  async findOrCreate(
    githubId: string,
    profile: { username: string; photos?: Array<{ value?: string | null }> },
  ) {
    const existed = Array.from(this.users.values()).find(
      (user) => user.githubId === githubId,
    );
    if (existed) {
      existed.username = profile.username;
      existed.avatar = profile.photos?.[0]?.value || null;
      return { ...existed };
    }

    const id = `gh-${this.idSeq++}`;
    const user: MemoryUser = {
      id,
      githubId,
      username: profile.username,
      email: null,
      passwordHash: null,
      role: 'DEVELOPER',
      status: 'ACTIVE',
      avatar: profile.photos?.[0]?.value || null,
      emailVerifiedAt: null,
      emailVerifyRequired: false,
      lastVerificationSentAt: null,
    };

    this.users.set(id, user);
    return { ...user };
  }

  async findOne(id: string) {
    const user = this.users.get(id);
    return user ? { ...user } : null;
  }

  async findByEmail(email: string) {
    const normalized = email.trim().toLowerCase();
    const user = Array.from(this.users.values()).find(
      (item) => item.email?.toLowerCase() === normalized,
    );
    return user ? { ...user } : null;
  }

  async findByUsername(username: string) {
    const user = Array.from(this.users.values()).find(
      (item) => item.username === username,
    );
    return user ? { ...user } : null;
  }

  async findLocalLoginCandidates(identifier: string, loginByEmail: boolean) {
    const normalized = identifier.trim();
    return Array.from(this.users.values())
      .filter((item) => {
        if (!item.passwordHash) {
          return false;
        }

        if (loginByEmail) {
          return item.email?.toLowerCase() === normalized.toLowerCase();
        }

        return item.username === normalized;
      })
      .map((item) => ({
        id: item.id,
        email: item.email,
        username: item.username,
        role: item.role,
        status: item.status,
        emailVerifiedAt: item.emailVerifiedAt,
        emailVerifyRequired: item.emailVerifyRequired,
        passwordHash: item.passwordHash,
      }));
  }

  async createLocalUser(input: {
    username: string;
    email: string;
    passwordHash: string;
    emailVerifyRequired?: boolean;
  }) {
    const id = `local-${this.idSeq++}`;
    const user: MemoryUser = {
      id,
      githubId: null,
      username: input.username,
      email: input.email,
      passwordHash: input.passwordHash,
      role: 'DEVELOPER',
      status: 'ACTIVE',
      avatar: null,
      emailVerifiedAt: null,
      emailVerifyRequired: input.emailVerifyRequired ?? true,
      lastVerificationSentAt: null,
    };

    this.users.set(id, user);
    return { ...user };
  }

  async deleteById(userId: string) {
    const existed = this.users.get(userId);
    if (!existed) {
      throw new Error('User not found');
    }
    this.users.delete(userId);
    return { ...existed };
  }
  async touchLastLogin(userId: string) {
    const user = this.users.get(userId);
    if (!user) {
      return;
    }

    user.lastLoginAt = new Date();
  }
  async markEmailVerified(userId: string) {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.emailVerifiedAt = new Date();
    user.emailVerifyRequired = false;
    user.lastVerificationSentAt = new Date();
  }
}

interface PendingVerification {
  userId: string;
  email: string;
  token: string;
  code: string;
  expiresAt: Date;
}

class InMemoryEmailVerificationService {
  private sequence = 1;
  private byToken = new Map<string, PendingVerification>();
  private byEmail = new Map<string, PendingVerification>();

  constructor(
    private readonly usersService: InMemoryUsersService,
    private readonly mailVerificationPolicyService: InMemoryMailVerificationPolicyService,
  ) {}

  async sendVerificationForUser(payload: {
    userId: string;
    email: string;
    username: string;
  }) {
    const token = `verify-token-${this.sequence}`;
    const code = String(100000 + this.sequence);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    this.sequence += 1;

    const record: PendingVerification = {
      userId: payload.userId,
      email: payload.email.trim().toLowerCase(),
      token,
      code,
      expiresAt,
    };

    this.byToken.set(token, record);
    this.byEmail.set(record.email, record);

    return {
      verificationSent: true,
      requiresEmailVerification: true,
      email: this.maskEmail(record.email),
      expiresAt,
    };
  }

  async verifyByToken(rawToken: string) {
    const token = rawToken.trim();
    const record = this.byToken.get(token);
    if (!record || record.expiresAt.getTime() <= Date.now()) {
      throw new UnauthorizedException(
        'Verification token is invalid or expired',
      );
    }

    await this.usersService.markEmailVerified(record.userId);
    this.byToken.delete(record.token);
    this.byEmail.delete(record.email);

    return {
      verified: true,
      email: this.maskEmail(record.email),
      userId: record.userId,
    };
  }

  async verifyByCode(rawEmail: string, rawCode: string) {
    const email = rawEmail.trim().toLowerCase();
    const code = rawCode.trim();
    const record = this.byEmail.get(email);

    if (
      !record ||
      record.code !== code ||
      record.expiresAt.getTime() <= Date.now()
    ) {
      throw new UnauthorizedException(
        'Verification code is invalid or expired',
      );
    }

    await this.usersService.markEmailVerified(record.userId);
    this.byToken.delete(record.token);
    this.byEmail.delete(email);

    return {
      verified: true,
      email: this.maskEmail(email),
      userId: record.userId,
    };
  }

  async resend(emailInput: string) {
    const email = emailInput.trim().toLowerCase();
    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();

    if (!mailVerificationEnforced) {
      return {
        resent: false,
        email: this.maskEmail(email),
        reason: 'MAIL_DISABLED',
        mailEnabled: false,
        emailVerificationEnforced: false,
        verificationRequiredNow: false,
      };
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return {
        resent: true,
        email: this.maskEmail(email),
        mailEnabled: true,
        emailVerificationEnforced: true,
        verificationRequiredNow: true,
      };
    }

    const verificationRequiredNow =
      this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(
        user,
        mailVerificationEnforced,
      );

    if (!verificationRequiredNow) {
      return {
        resent: false,
        alreadyVerified: true,
        email: this.maskEmail(email),
        reason: 'VERIFICATION_NOT_REQUIRED',
        mailEnabled: true,
        emailVerificationEnforced: true,
        verificationRequiredNow: false,
      };
    }

    await this.sendVerificationForUser({
      userId: user.id,
      email,
      username: user.username,
    });

    return {
      resent: true,
      email: this.maskEmail(email),
      mailEnabled: true,
      emailVerificationEnforced: true,
      verificationRequiredNow: true,
    };
  }

  getLatestCode(email: string) {
    return this.byEmail.get(email.trim().toLowerCase())?.code;
  }

  getLatestToken(email: string) {
    return this.byEmail.get(email.trim().toLowerCase())?.token;
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
}

class InMemoryCaptchaService {
  private policy: {
    enabled: boolean;
    provider: 'TURNSTILE' | 'RECAPTCHA';
    siteKey: string | null;
    registerEnabled: boolean;
    loginEnabled: boolean;
  } = {
    enabled: true,
    provider: 'TURNSTILE',
    siteKey: 'test-site-key',
    registerEnabled: true,
    loginEnabled: true,
  };

  async getPublicConfig() {
    return { ...this.policy };
  }

  setPolicy(next: Partial<typeof this.policy>) {
    this.policy = {
      ...this.policy,
      ...next,
    };
  }

  async validateCaptcha(
    action: 'register' | 'login',
    token: string | undefined,
  ) {
    if (!this.policy.enabled) {
      return;
    }

    if (action === 'register' && !this.policy.registerEnabled) {
      return;
    }

    if (action === 'login' && !this.policy.loginEnabled) {
      return;
    }

    const captchaToken = (token || '').trim();
    if (!captchaToken) {
      throw new BadRequestException('captchaToken is required');
    }

    if (captchaToken !== 'valid-captcha') {
      throw new UnauthorizedException('Captcha validation failed');
    }
  }
}

class InMemoryMailVerificationPolicyService {
  private mailVerificationEnforced = true;

  async isMailVerificationEnforced() {
    return this.mailVerificationEnforced;
  }

  setMailVerificationEnforced(enabled: boolean) {
    this.mailVerificationEnforced = enabled;
  }

  shouldRequireEmailVerificationNow(
    user: {
      passwordHash: string | null;
      email: string | null;
      emailVerifiedAt: Date | null;
    },
    mailVerificationEnforced: boolean,
  ) {
    if (!mailVerificationEnforced) {
      return false;
    }

    if (!user.passwordHash || !user.email) {
      return false;
    }

    return !user.emailVerifiedAt;
  }
}

@Module({
  imports: [
    JwtModule.register({
      secret: 'test-jwt-secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    InMemoryUsersService,
    InMemoryCaptchaService,
    InMemoryMailVerificationPolicyService,
    {
      provide: UsersService,
      useExisting: InMemoryUsersService,
    },
    {
      provide: CaptchaService,
      useExisting: InMemoryCaptchaService,
    },
    {
      provide: MailVerificationPolicyService,
      useExisting: InMemoryMailVerificationPolicyService,
    },
    {
      provide: EmailVerificationService,
      useFactory: (
        usersService: InMemoryUsersService,
        mailVerificationPolicyService: InMemoryMailVerificationPolicyService,
      ) => {
        return new InMemoryEmailVerificationService(
          usersService,
          mailVerificationPolicyService,
        );
      },
      inject: [InMemoryUsersService, InMemoryMailVerificationPolicyService],
    },
  ],
})
class AuthTestModule {}

describe('Auth Local Scenarios (e2e)', () => {
  let app: INestApplication;
  let emailVerification: InMemoryEmailVerificationService;
  let captchaService: InMemoryCaptchaService;
  let mailPolicyService: InMemoryMailVerificationPolicyService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    emailVerification = moduleFixture.get(EmailVerificationService);
    captchaService = moduleFixture.get(CaptchaService);
    mailPolicyService = moduleFixture.get(MailVerificationPolicyService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /auth/captcha/config should return public policy', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/captcha/config')
      .expect(200);

    expect(response.body).toMatchObject({
      enabled: true,
      provider: 'TURNSTILE',
      siteKey: 'test-site-key',
      registerEnabled: true,
      loginEnabled: true,
    });
  });

  it('POST /auth/register should fail when captcha is missing', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'alice',
        email: 'alice@example.com',
        password: 'Password123',
        captchaToken: '',
      })
      .expect(400);

    expect(String(response.body.message)).toContain('captchaToken is required');
  });

  it('register -> login blocked before verify -> verify by code -> login success', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'bob',
        email: 'bob@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.verificationSent).toBe(true);
        expect(res.body.requiresEmailVerification).toBe(true);
      });

    const beforeVerify = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'bob@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(401);

    expect(String(beforeVerify.body.message).toLowerCase()).toContain(
      'not verified',
    );

    const code = emailVerification.getLatestCode('bob@example.com');
    expect(code).toBeTruthy();

    await request(app.getHttpServer())
      .post('/auth/email/verify-code')
      .send({
        email: 'bob@example.com',
        code,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.verified).toBe(true);
      });

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'bob@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201)
      .expect((res) => {
        expect(typeof res.body.access_token).toBe('string');
      });
  });

  it('register -> resend -> verify by token -> login with username success', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'charlie',
        email: 'charlie@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/email/resend')
      .send({
        email: 'charlie@example.com',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.resent).toBe(true);
      });

    const token = emailVerification.getLatestToken('charlie@example.com');
    expect(token).toBeTruthy();

    await request(app.getHttpServer())
      .get('/auth/email/verify')
      .query({
        token,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.verified).toBe(true);
      });

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'charlie',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201)
      .expect((res) => {
        expect(typeof res.body.access_token).toBe('string');
      });
  });

  it('register should skip email verification when mail feature is disabled', async () => {
    mailPolicyService.setMailVerificationEnforced(false);

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'mailoff',
        email: 'mailoff@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201);

    expect(registerResponse.body.verificationSent).toBe(false);
    expect(registerResponse.body.requiresEmailVerification).toBe(false);
    expect(registerResponse.body.mailEnabled).toBe(false);
    expect(
      emailVerification.getLatestCode('mailoff@example.com'),
    ).toBeUndefined();

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'mailoff@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201)
      .expect((res) => {
        expect(typeof res.body.access_token).toBe('string');
      });
  });

  it('historical local users created while mail disabled should require verification after mail is enabled', async () => {
    mailPolicyService.setMailVerificationEnforced(false);

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'history',
        email: 'history@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'history@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201);

    mailPolicyService.setMailVerificationEnforced(true);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'history@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(401)
      .expect((res) => {
        expect(String(res.body.message).toLowerCase()).toContain(
          'not verified',
        );
      });

    await request(app.getHttpServer())
      .post('/auth/email/resend')
      .send({
        email: 'history@example.com',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.resent).toBe(true);
        expect(res.body.mailEnabled).toBe(true);
        expect(res.body.verificationRequiredNow).toBe(true);
      });

    const code = emailVerification.getLatestCode('history@example.com');
    expect(code).toBeTruthy();

    await request(app.getHttpServer())
      .post('/auth/email/verify-code')
      .send({
        email: 'history@example.com',
        code,
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'history@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201);
  });

  it('resend should return explicit mail-disabled result when mail feature is disabled', async () => {
    mailPolicyService.setMailVerificationEnforced(false);

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'resendoff',
        email: 'resendoff@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/email/resend')
      .send({
        email: 'resendoff@example.com',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.resent).toBe(false);
        expect(res.body.reason).toBe('MAIL_DISABLED');
        expect(res.body.mailEnabled).toBe(false);
        expect(res.body.verificationRequiredNow).toBe(false);
      });
  });

  it('should support disabling captcha for login by policy', async () => {
    captchaService.setPolicy({
      loginEnabled: false,
    });

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'delta',
        email: 'delta@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201);

    const code = emailVerification.getLatestCode('delta@example.com');
    expect(code).toBeTruthy();

    await request(app.getHttpServer())
      .post('/auth/email/verify-code')
      .send({
        email: 'delta@example.com',
        code,
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'delta@example.com',
        password: 'Password123',
      })
      .expect(201)
      .expect((res) => {
        expect(typeof res.body.access_token).toBe('string');
      });
  });

  it('should reject login when captcha token is invalid', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'echo',
        email: 'echo@example.com',
        password: 'Password123',
        captchaToken: 'valid-captcha',
      })
      .expect(201);

    const code = emailVerification.getLatestCode('echo@example.com');
    expect(code).toBeTruthy();

    await request(app.getHttpServer())
      .post('/auth/email/verify-code')
      .send({
        email: 'echo@example.com',
        code,
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'echo@example.com',
        password: 'Password123',
        captchaToken: 'bad-token',
      })
      .expect(401);

    expect(String(response.body.message)).toContain(
      'Captcha validation failed',
    );
  });
});
