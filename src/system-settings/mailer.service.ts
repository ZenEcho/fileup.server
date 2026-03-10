import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import nodemailer from 'nodemailer';
import { SystemConfigAuditCategory } from '../prisma/prisma-client';
import { SystemSettingsService } from './system-settings.service';

interface SendMailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface MailTransportConfig {
  provider: 'SMTP';
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  fromName: string;
  enabled: boolean;
}

export interface SendMailResult {
  success: boolean;
  messageId?: string;
  response?: string;
  errorCode?: string;
  errorMessage?: string;
  durationMs: number;
}

type VerificationScene = 'REGISTER' | 'EMAIL_CHANGE' | 'LOCAL_BIND';

@Injectable()
export class MailerService {
  constructor(private readonly settingsService: SystemSettingsService) {}

  async sendVerificationEmail(payload: {
    to: string;
    username: string;
    verifyUrl: string;
    code: string;
    scene?: VerificationScene;
  }) {
    const scene = payload.scene || 'REGISTER';
    const template = this.resolveVerificationTemplate(scene);

    const subject = template.subject;
    const text = [
      `Hi ${payload.username},`,
      '',
      template.intro,
      `Verification code: ${payload.code}`,
      `Verification link: ${payload.verifyUrl}`,
      '',
      template.outro,
    ].join('\n');

    const html = `
      <p>Hi ${this.escapeHtml(payload.username)},</p>
      <p>${this.escapeHtml(template.intro)}</p>
      <p><strong>Verification code:</strong> ${this.escapeHtml(payload.code)}</p>
      <p><a href="${this.escapeHtml(payload.verifyUrl)}" target="_blank" rel="noopener noreferrer">Click to verify your email</a></p>
      <p>${this.escapeHtml(template.outro)}</p>
    `;

    return this.sendMailOrThrow({
      to: payload.to,
      subject,
      text,
      html,
    });
  }

  async sendPasswordResetEmail(payload: {
    to: string;
    username: string;
    resetUrl: string;
    expiresAt: Date;
  }) {
    const subject = 'Reset your Fileup account password';
    const text = [
      `Hi ${payload.username},`,
      '',
      'An administrator requested a password reset for your account.',
      `Reset link: ${payload.resetUrl}`,
      `This link expires at: ${payload.expiresAt.toISOString()}`,
      '',
      'If this was not expected, please contact support immediately.',
    ].join('\n');

    const html = `
      <p>Hi ${this.escapeHtml(payload.username)},</p>
      <p>An administrator requested a password reset for your account.</p>
      <p><a href="${this.escapeHtml(payload.resetUrl)}" target="_blank" rel="noopener noreferrer">Click to reset your password</a></p>
      <p>This link expires at: ${this.escapeHtml(payload.expiresAt.toISOString())}</p>
      <p>If this was not expected, please contact support immediately.</p>
    `;

    return this.sendMailOrThrow({
      to: payload.to,
      subject,
      text,
      html,
    });
  }

  async sendTemporaryPasswordEmail(payload: {
    to: string;
    username: string;
    temporaryPassword: string;
  }) {
    const subject = 'Your temporary Fileup account password';
    const text = [
      `Hi ${payload.username},`,
      '',
      'An administrator generated a temporary password for your account.',
      `Temporary password: ${payload.temporaryPassword}`,
      'Please log in with this password and change it immediately in Security Settings.',
      '',
      'If this was not expected, please contact support immediately.',
    ].join('\n');

    const html = `
      <p>Hi ${this.escapeHtml(payload.username)},</p>
      <p>An administrator generated a temporary password for your account.</p>
      <p><strong>Temporary password:</strong> ${this.escapeHtml(payload.temporaryPassword)}</p>
      <p>Please log in with this password and change it immediately in Security Settings.</p>
      <p>If this was not expected, please contact support immediately.</p>
    `;

    return this.sendMailOrThrow({
      to: payload.to,
      subject,
      text,
      html,
    });
  }

  async sendTestEmail(payload: {
    to: string;
    subject?: string;
    operatorId: string;
  }): Promise<SendMailResult> {
    const subject =
      payload.subject?.trim() ||
      `Fileup SMTP Test - ${new Date().toISOString()}`;

    const text = [
      'This is a test email from Fileup admin settings.',
      `Triggered by admin user: ${payload.operatorId}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join('\n');

    const result = await this.sendMailSafe({
      to: payload.to,
      subject,
      text,
    });

    await this.settingsService.writeAuditLog(
      SystemConfigAuditCategory.MAIL,
      'TEST_MAIL_CONFIG',
      payload.operatorId,
      result.success,
      result.success
        ? `messageId=${result.messageId || '-'} to=${payload.to}`
        : `to=${payload.to} code=${result.errorCode || '-'} msg=${result.errorMessage || '-'}`,
    );

    return result;
  }

  private resolveVerificationTemplate(scene: VerificationScene): {
    subject: string;
    intro: string;
    outro: string;
  } {
    if (scene === 'EMAIL_CHANGE') {
      return {
        subject: 'Confirm your new Fileup account email',
        intro:
          'Please verify this new email address before it is applied to your account.',
        outro: 'If you did not request this change, you can ignore this email.',
      };
    }

    if (scene === 'LOCAL_BIND') {
      return {
        subject: 'Verify email to enable password login on Fileup',
        intro:
          'Please verify your email to finish binding password login for your account.',
        outro:
          'If you did not request this operation, you can ignore this email.',
      };
    }

    return {
      subject: 'Verify your Fileup account email',
      intro: 'Please verify your email to complete registration.',
      outro: 'If you did not create this account, you can ignore this email.',
    };
  }

  private async sendMailOrThrow(input: SendMailInput) {
    const result = await this.sendMailSafe(input);
    if (!result.success) {
      throw new ServiceUnavailableException(
        result.errorMessage || 'Mail sending failed',
      );
    }
    return result;
  }

  private async sendMailSafe(input: SendMailInput): Promise<SendMailResult> {
    const startedAt = Date.now();
    let config: MailTransportConfig | null = null;

    try {
      config =
        (await this.settingsService.getMailTransportConfig()) as MailTransportConfig;
      const transport = this.createTransport(config);

      const info = (await transport.sendMail({
        from: config.fromName
          ? `${config.fromName} <${config.fromEmail}>`
          : config.fromEmail,
        to: input.to,
        subject: input.subject,
        text: input.text,
        html: input.html,
      })) as { messageId?: string; response?: string };

      return {
        success: true,
        messageId: String(info.messageId || ''),
        response: String(info.response || ''),
        durationMs: Date.now() - startedAt,
      };
    } catch (error) {
      return {
        success: false,
        errorCode: (error as { code?: string }).code,
        errorMessage: this.normalizeSendError(error, config),
        durationMs: Date.now() - startedAt,
      };
    }
  }

  private createTransport(config: MailTransportConfig) {
    if (!config.enabled) {
      throw new BadRequestException('Mail config is disabled');
    }

    if (
      !config.smtpHost ||
      !config.smtpPort ||
      !config.smtpUser ||
      !config.smtpPass ||
      !config.fromEmail
    ) {
      throw new BadRequestException(
        'Mail config is incomplete, please configure SMTP host/port/user/password/fromEmail',
      );
    }

    if (config.smtpHost.includes('://')) {
      throw new BadRequestException(
        'smtpHost must be hostname only (for example: smtp.qq.com), do not include http:// or https://',
      );
    }

    return nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
  }

  private normalizeSendError(
    error: unknown,
    config: MailTransportConfig | null,
  ) {
    const raw = (error as { message?: string }).message || 'Mail send failed';
    const lowerRaw = raw.toLowerCase();

    if (
      lowerRaw.includes('wrong version number') ||
      lowerRaw.includes('tls_validate_record_header')
    ) {
      const configHint = config
        ? `Current config: smtpHost=${config.smtpHost}, smtpPort=${config.smtpPort}, smtpSecure=${config.smtpSecure}.`
        : '';

      return [
        'SMTP TLS handshake failed.',
        'Check smtpPort/smtpSecure combination: use 465 with smtpSecure=true, use 587 with smtpSecure=false (STARTTLS).',
        'Also ensure smtpHost is host only (no http/https).',
        configHint,
        `Raw: ${raw}`,
      ]
        .filter(Boolean)
        .join(' ');
    }

    return raw;
  }

  private escapeHtml(input: string) {
    return input
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}
