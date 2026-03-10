import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  INestApplication,
  Module,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { MailerService } from '../src/system-settings/mailer.service';
import { SystemSettingsController } from '../src/system-settings/system-settings.controller';
import { SystemSettingsService } from '../src/system-settings/system-settings.service';

class InMemorySystemSettingsService {
  private mailConfig = {
    id: 'default',
    provider: 'SMTP' as const,
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: 'mailer',
    fromEmail: 'no-reply@example.com',
    fromName: 'Fileup',
    enabled: false,
    smtpPassConfigured: false,
    updatedAt: new Date(),
  };

  private captchaConfig = {
    id: 'default',
    provider: 'TURNSTILE' as const,
    siteKey: 'test-site-key',
    enabled: false,
    registerEnabled: true,
    loginEnabled: false,
    scoreThreshold: 0.5,
    secretConfigured: false,
    updatedAt: new Date(),
  };

  private logs: Array<{
    category: 'MAIL' | 'CAPTCHA';
    action: string;
    operatorId: string | null;
    success: boolean;
    detail: string;
  }> = [];

  async getMailConfig() {
    return { ...this.mailConfig };
  }

  async updateMailConfig(payload: Record<string, unknown>, operatorId: string) {
    if (payload.provider) {
      this.mailConfig.provider = payload.provider as 'SMTP';
    }
    if (payload.smtpHost !== undefined) {
      this.mailConfig.smtpHost = String(payload.smtpHost || '');
    }
    if (payload.smtpPort !== undefined) {
      this.mailConfig.smtpPort = Number(payload.smtpPort || 0);
    }
    if (payload.smtpSecure !== undefined) {
      this.mailConfig.smtpSecure = Boolean(payload.smtpSecure);
    }
    if (payload.smtpUser !== undefined) {
      this.mailConfig.smtpUser = String(payload.smtpUser || '');
    }
    if (payload.fromEmail !== undefined) {
      this.mailConfig.fromEmail = String(payload.fromEmail || '');
    }
    if (payload.fromName !== undefined) {
      this.mailConfig.fromName = String(payload.fromName || '');
    }
    if (payload.enabled !== undefined) {
      this.mailConfig.enabled = Boolean(payload.enabled);
    }

    if (payload.clearSmtpPass) {
      this.mailConfig.smtpPassConfigured = false;
    } else if (payload.smtpPass) {
      this.mailConfig.smtpPassConfigured = true;
    }

    this.mailConfig.updatedAt = new Date();

    await this.writeAuditLog(
      'MAIL',
      'UPDATE_MAIL_CONFIG',
      operatorId,
      true,
      'Mail config updated in test',
    );

    return { ...this.mailConfig };
  }

  async getCaptchaConfig() {
    return { ...this.captchaConfig };
  }

  async updateCaptchaConfig(
    payload: Record<string, unknown>,
    operatorId: string,
  ) {
    if (payload.provider) {
      this.captchaConfig.provider = payload.provider as
        | 'TURNSTILE'
        | 'RECAPTCHA';
    }
    if (payload.siteKey !== undefined) {
      this.captchaConfig.siteKey = String(payload.siteKey || '');
    }
    if (payload.enabled !== undefined) {
      this.captchaConfig.enabled = Boolean(payload.enabled);
    }
    if (payload.registerEnabled !== undefined) {
      this.captchaConfig.registerEnabled = Boolean(payload.registerEnabled);
    }
    if (payload.loginEnabled !== undefined) {
      this.captchaConfig.loginEnabled = Boolean(payload.loginEnabled);
    }
    if (payload.scoreThreshold !== undefined) {
      this.captchaConfig.scoreThreshold = Number(payload.scoreThreshold || 0);
    }

    if (payload.clearSecret) {
      this.captchaConfig.secretConfigured = false;
    } else if (payload.secret) {
      this.captchaConfig.secretConfigured = true;
    }

    this.captchaConfig.updatedAt = new Date();

    await this.writeAuditLog(
      'CAPTCHA',
      'UPDATE_CAPTCHA_CONFIG',
      operatorId,
      true,
      'Captcha config updated in test',
    );

    return { ...this.captchaConfig };
  }

  async writeAuditLog(
    category: 'MAIL' | 'CAPTCHA',
    action: string,
    operatorId: string | null,
    success: boolean,
    detail: string,
  ) {
    this.logs.push({
      category,
      action,
      operatorId,
      success,
      detail,
    });
  }

  getAuditLogs() {
    return [...this.logs];
  }
}

class InMemoryMailerService {
  constructor(
    private readonly settingsService: InMemorySystemSettingsService,
  ) {}

  async sendTestEmail(payload: {
    to: string;
    subject?: string;
    operatorId: string;
  }) {
    const success = !payload.to.includes('fail');

    if (success) {
      await this.settingsService.writeAuditLog(
        'MAIL',
        'TEST_MAIL_CONFIG',
        payload.operatorId,
        true,
        `messageId=test-${Date.now()} to=${payload.to}`,
      );

      return {
        success: true,
        messageId: `test-${Date.now()}`,
        response: '250 OK',
        durationMs: 12,
      };
    }

    await this.settingsService.writeAuditLog(
      'MAIL',
      'TEST_MAIL_CONFIG',
      payload.operatorId,
      false,
      `to=${payload.to} reason=simulated failure`,
    );

    return {
      success: false,
      errorCode: 'SIMULATED',
      errorMessage: 'Simulated delivery failure',
      durationMs: 10,
    };
  }
}

const testJwtGuard: CanActivate = {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
      user?: {
        userId: string;
        username: string;
        role: string;
        avatar: null;
      };
    }>();

    const roleHeader = req.headers['x-test-role'];
    const role =
      typeof roleHeader === 'string' ? roleHeader.toUpperCase() : 'DEVELOPER';

    req.user = {
      userId: 'tester-1',
      username: 'tester',
      role,
      avatar: null,
    };

    return true;
  },
};

@Module({
  controllers: [SystemSettingsController],
  providers: [
    InMemorySystemSettingsService,
    {
      provide: SystemSettingsService,
      useExisting: InMemorySystemSettingsService,
    },
    {
      provide: MailerService,
      useFactory: (settingsService: InMemorySystemSettingsService) => {
        return new InMemoryMailerService(
          settingsService,
        ) as unknown as MailerService;
      },
      inject: [InMemorySystemSettingsService],
    },
  ],
})
class SettingsTestModule {}

describe('Admin System Settings Scenarios (e2e)', () => {
  let app: INestApplication;
  let settingsService: InMemorySystemSettingsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SettingsTestModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(testJwtGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    settingsService = moduleFixture.get(SystemSettingsService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('admin should access mail config, non-admin should be forbidden', async () => {
    await request(app.getHttpServer())
      .get('/admin/settings/mail')
      .set('x-test-role', 'ADMIN')
      .expect(200)
      .expect((res) => {
        expect(res.body.provider).toBe('SMTP');
      });

    const forbidden = await request(app.getHttpServer())
      .get('/admin/settings/mail')
      .set('x-test-role', 'DEVELOPER')
      .expect(403);

    expect(String(forbidden.body.message)).toContain(
      'Only admins can access system settings',
    );
  });

  it('admin should update mail config and keep secret masked in response', async () => {
    const response = await request(app.getHttpServer())
      .patch('/admin/settings/mail')
      .set('x-test-role', 'ADMIN')
      .send({
        smtpHost: 'smtp.mailgun.org',
        smtpPort: 465,
        smtpSecure: true,
        smtpUser: 'ops-mailer',
        smtpPass: 'super-secret-password',
        fromEmail: 'noreply@fileup.dev',
        fromName: 'Fileup Mail',
        enabled: true,
      })
      .expect(200);

    expect(response.body.smtpHost).toBe('smtp.mailgun.org');
    expect(response.body.smtpPassConfigured).toBe(true);
    expect(response.body.smtpPass).toBeUndefined();
  });

  it('test mail endpoint should return explicit success/failure payloads', async () => {
    await request(app.getHttpServer())
      .post('/admin/settings/mail/test')
      .set('x-test-role', 'ADMIN')
      .send({
        toEmail: 'ok@example.com',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(typeof res.body.messageId).toBe('string');
      });

    await request(app.getHttpServer())
      .post('/admin/settings/mail/test')
      .set('x-test-role', 'ADMIN')
      .send({
        toEmail: 'fail@example.com',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(typeof res.body.errorMessage).toBe('string');
      });
  });

  it('admin should update captcha config and write audit log', async () => {
    await request(app.getHttpServer())
      .patch('/admin/settings/captcha')
      .set('x-test-role', 'ADMIN')
      .send({
        provider: 'RECAPTCHA',
        siteKey: 'new-site-key',
        secret: 'new-secret',
        enabled: true,
        registerEnabled: true,
        loginEnabled: true,
        scoreThreshold: 0.7,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.provider).toBe('RECAPTCHA');
        expect(res.body.secretConfigured).toBe(true);
        expect(res.body.loginEnabled).toBe(true);
      });

    const logs = settingsService.getAuditLogs();
    const captchaLog = logs.find(
      (item) => item.action === 'UPDATE_CAPTCHA_CONFIG',
    );
    expect(captchaLog).toBeTruthy();
  });

  it('non-admin should be forbidden to test mail', async () => {
    const response = await request(app.getHttpServer())
      .post('/admin/settings/mail/test')
      .set('x-test-role', 'DEVELOPER')
      .send({
        toEmail: 'ok@example.com',
      })
      .expect(403);

    expect(String(response.body.message)).toContain(
      'Only admins can access system settings',
    );
  });
});
