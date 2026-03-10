import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CaptchaProvider,
  MailProvider,
  Prisma,
  SystemConfigAuditCategory,
} from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCaptchaConfigDto } from './dto/update-captcha-config.dto';
import { UpdateMailConfigDto } from './dto/update-mail-config.dto';
import { SecretCryptoService } from './secret-crypto.service';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SINGLETON_CONFIG_ID = 'default';

export interface MailConfigView {
  id: string;
  provider: MailProvider;
  smtpHost: string | null;
  smtpPort: number | null;
  smtpSecure: boolean;
  smtpUser: string | null;
  fromEmail: string | null;
  fromName: string | null;
  enabled: boolean;
  smtpPassConfigured: boolean;
  updatedAt: Date;
}

export interface MailTransportConfig {
  provider: MailProvider;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  fromName: string;
  enabled: boolean;
}

export interface CaptchaConfigView {
  id: string;
  provider: CaptchaProvider;
  siteKey: string | null;
  enabled: boolean;
  registerEnabled: boolean;
  loginEnabled: boolean;
  scoreThreshold: number;
  secretConfigured: boolean;
  updatedAt: Date;
}

export interface CaptchaSecretConfig {
  provider: CaptchaProvider;
  siteKey: string;
  secret: string;
  enabled: boolean;
  registerEnabled: boolean;
  loginEnabled: boolean;
  scoreThreshold: number;
}

@Injectable()
export class SystemSettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: SecretCryptoService,
  ) {}

  async getMailConfig(): Promise<MailConfigView> {
    const row = await this.ensureMailConfig();
    return this.mapMailConfigView(row);
  }

  async updateMailConfig(
    payload: UpdateMailConfigDto,
    operatorId: string,
  ): Promise<MailConfigView> {
    if (payload.smtpPort !== undefined) {
      const port = Number(payload.smtpPort);
      if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new BadRequestException(
          'smtpPort must be an integer between 1 and 65535',
        );
      }
    }

    if (payload.fromEmail !== undefined && payload.fromEmail !== null) {
      const fromEmail = payload.fromEmail.trim();
      if (fromEmail && !EMAIL_PATTERN.test(fromEmail)) {
        throw new BadRequestException('fromEmail format is invalid');
      }
    }

    const updateData: Prisma.SystemMailConfigUpdateInput = {
      provider: payload.provider,
      smtpHost: this.normalizeNullableString(payload.smtpHost),
      smtpPort:
        payload.smtpPort !== undefined ? Number(payload.smtpPort) : undefined,
      smtpSecure: payload.smtpSecure,
      smtpUser: this.normalizeNullableString(payload.smtpUser),
      fromEmail: this.normalizeNullableString(payload.fromEmail),
      fromName: this.normalizeNullableString(payload.fromName),
      enabled: payload.enabled,
      updatedBy: {
        connect: {
          id: operatorId,
        },
      },
    };

    if (payload.clearSmtpPass) {
      updateData.smtpPassEncrypted = null;
    } else if (payload.smtpPass) {
      updateData.smtpPassEncrypted = this.cryptoService.encrypt(
        payload.smtpPass,
      );
    }

    const row = await this.prisma.systemMailConfig.upsert({
      where: {
        id: SINGLETON_CONFIG_ID,
      },
      create: {
        id: SINGLETON_CONFIG_ID,
        provider: payload.provider || MailProvider.SMTP,
        smtpHost: this.normalizeNullableString(payload.smtpHost),
        smtpPort:
          payload.smtpPort !== undefined ? Number(payload.smtpPort) : null,
        smtpSecure: Boolean(payload.smtpSecure),
        smtpUser: this.normalizeNullableString(payload.smtpUser),
        smtpPassEncrypted: payload.smtpPass
          ? this.cryptoService.encrypt(payload.smtpPass)
          : null,
        fromEmail: this.normalizeNullableString(payload.fromEmail),
        fromName: this.normalizeNullableString(payload.fromName),
        enabled: Boolean(payload.enabled),
        updatedBy: {
          connect: {
            id: operatorId,
          },
        },
      },
      update: updateData,
    });

    await this.writeAuditLog(
      SystemConfigAuditCategory.MAIL,
      'UPDATE_MAIL_CONFIG',
      operatorId,
      true,
      'Mail config updated by admin',
    );

    return this.mapMailConfigView(row);
  }

  async getMailTransportConfig(): Promise<MailTransportConfig> {
    const row = await this.ensureMailConfig();

    const smtpPass = row.smtpPassEncrypted
      ? this.cryptoService.decrypt(row.smtpPassEncrypted)
      : '';

    return {
      provider: row.provider,
      smtpHost: row.smtpHost || '',
      smtpPort: row.smtpPort || 0,
      smtpSecure: row.smtpSecure,
      smtpUser: row.smtpUser || '',
      smtpPass,
      fromEmail: row.fromEmail || '',
      fromName: row.fromName || '',
      enabled: row.enabled,
    };
  }

  async getCaptchaConfig(): Promise<CaptchaConfigView> {
    const row = await this.ensureCaptchaConfig();
    return this.mapCaptchaConfigView(row);
  }

  async updateCaptchaConfig(
    payload: UpdateCaptchaConfigDto,
    operatorId: string,
  ): Promise<CaptchaConfigView> {
    if (payload.scoreThreshold !== undefined) {
      const score = Number(payload.scoreThreshold);
      if (Number.isNaN(score) || score < 0 || score > 1) {
        throw new BadRequestException('scoreThreshold must be between 0 and 1');
      }
    }

    const updateData: Prisma.SystemCaptchaConfigUpdateInput = {
      provider: payload.provider,
      siteKey: this.normalizeNullableString(payload.siteKey),
      enabled: payload.enabled,
      registerEnabled: payload.registerEnabled,
      loginEnabled: payload.loginEnabled,
      scoreThreshold:
        payload.scoreThreshold !== undefined
          ? Number(payload.scoreThreshold)
          : undefined,
      updatedBy: {
        connect: {
          id: operatorId,
        },
      },
    };

    if (payload.clearSecret) {
      updateData.secretEncrypted = null;
    } else if (payload.secret) {
      updateData.secretEncrypted = this.cryptoService.encrypt(payload.secret);
    }

    const row = await this.prisma.systemCaptchaConfig.upsert({
      where: {
        id: SINGLETON_CONFIG_ID,
      },
      create: {
        id: SINGLETON_CONFIG_ID,
        provider: payload.provider || CaptchaProvider.TURNSTILE,
        siteKey: this.normalizeNullableString(payload.siteKey),
        secretEncrypted: payload.secret
          ? this.cryptoService.encrypt(payload.secret)
          : null,
        enabled: Boolean(payload.enabled),
        registerEnabled:
          payload.registerEnabled !== undefined
            ? Boolean(payload.registerEnabled)
            : true,
        loginEnabled: Boolean(payload.loginEnabled),
        scoreThreshold:
          payload.scoreThreshold !== undefined
            ? Number(payload.scoreThreshold)
            : 0.5,
        updatedBy: {
          connect: {
            id: operatorId,
          },
        },
      },
      update: updateData,
    });

    await this.writeAuditLog(
      SystemConfigAuditCategory.CAPTCHA,
      'UPDATE_CAPTCHA_CONFIG',
      operatorId,
      true,
      'Captcha config updated by admin',
    );

    return this.mapCaptchaConfigView(row);
  }

  async getCaptchaSecretConfig(): Promise<CaptchaSecretConfig> {
    const row = await this.ensureCaptchaConfig();
    return {
      provider: row.provider,
      siteKey: row.siteKey || '',
      secret: row.secretEncrypted
        ? this.cryptoService.decrypt(row.secretEncrypted)
        : '',
      enabled: row.enabled,
      registerEnabled: row.registerEnabled,
      loginEnabled: row.loginEnabled,
      scoreThreshold: row.scoreThreshold,
    };
  }

  async writeAuditLog(
    category: SystemConfigAuditCategory,
    action: string,
    operatorId: string | null,
    success: boolean,
    detail: string,
  ) {
    await this.prisma.systemConfigAuditLog.create({
      data: {
        category,
        action,
        success,
        detail,
        operatorId,
      },
    });
  }

  private async ensureMailConfig() {
    return this.prisma.systemMailConfig.upsert({
      where: {
        id: SINGLETON_CONFIG_ID,
      },
      create: {
        id: SINGLETON_CONFIG_ID,
      },
      update: {},
    });
  }

  private async ensureCaptchaConfig() {
    return this.prisma.systemCaptchaConfig.upsert({
      where: {
        id: SINGLETON_CONFIG_ID,
      },
      create: {
        id: SINGLETON_CONFIG_ID,
      },
      update: {},
    });
  }

  private mapMailConfigView(row: {
    id: string;
    provider: MailProvider;
    smtpHost: string | null;
    smtpPort: number | null;
    smtpSecure: boolean;
    smtpUser: string | null;
    smtpPassEncrypted: string | null;
    fromEmail: string | null;
    fromName: string | null;
    enabled: boolean;
    updatedAt: Date;
  }): MailConfigView {
    return {
      id: row.id,
      provider: row.provider,
      smtpHost: row.smtpHost,
      smtpPort: row.smtpPort,
      smtpSecure: row.smtpSecure,
      smtpUser: row.smtpUser,
      fromEmail: row.fromEmail,
      fromName: row.fromName,
      enabled: row.enabled,
      smtpPassConfigured: Boolean(row.smtpPassEncrypted),
      updatedAt: row.updatedAt,
    };
  }

  private mapCaptchaConfigView(row: {
    id: string;
    provider: CaptchaProvider;
    siteKey: string | null;
    enabled: boolean;
    registerEnabled: boolean;
    loginEnabled: boolean;
    scoreThreshold: number;
    secretEncrypted: string | null;
    updatedAt: Date;
  }): CaptchaConfigView {
    return {
      id: row.id,
      provider: row.provider,
      siteKey: row.siteKey,
      enabled: row.enabled,
      registerEnabled: row.registerEnabled,
      loginEnabled: row.loginEnabled,
      scoreThreshold: row.scoreThreshold,
      secretConfigured: Boolean(row.secretEncrypted),
      updatedAt: row.updatedAt,
    };
  }

  private normalizeNullableString(input: unknown): string | null | undefined {
    if (input === undefined) {
      return undefined;
    }

    if (input === null) {
      return null;
    }

    if (typeof input !== 'string') {
      return null;
    }

    const value = input.trim();
    return value ? value : null;
  }
}
