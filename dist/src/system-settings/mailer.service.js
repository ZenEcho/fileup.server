"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_client_1 = require("../prisma/prisma-client");
const system_settings_service_1 = require("./system-settings.service");
let MailerService = class MailerService {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async sendVerificationEmail(payload) {
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
    async sendPasswordResetEmail(payload) {
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
    async sendTemporaryPasswordEmail(payload) {
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
    async sendTestEmail(payload) {
        const subject = payload.subject?.trim() ||
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
        await this.settingsService.writeAuditLog(prisma_client_1.SystemConfigAuditCategory.MAIL, 'TEST_MAIL_CONFIG', payload.operatorId, result.success, result.success
            ? `messageId=${result.messageId || '-'} to=${payload.to}`
            : `to=${payload.to} code=${result.errorCode || '-'} msg=${result.errorMessage || '-'}`);
        return result;
    }
    resolveVerificationTemplate(scene) {
        if (scene === 'EMAIL_CHANGE') {
            return {
                subject: 'Confirm your new Fileup account email',
                intro: 'Please verify this new email address before it is applied to your account.',
                outro: 'If you did not request this change, you can ignore this email.',
            };
        }
        if (scene === 'LOCAL_BIND') {
            return {
                subject: 'Verify email to enable password login on Fileup',
                intro: 'Please verify your email to finish binding password login for your account.',
                outro: 'If you did not request this operation, you can ignore this email.',
            };
        }
        return {
            subject: 'Verify your Fileup account email',
            intro: 'Please verify your email to complete registration.',
            outro: 'If you did not create this account, you can ignore this email.',
        };
    }
    async sendMailOrThrow(input) {
        const result = await this.sendMailSafe(input);
        if (!result.success) {
            throw new common_1.ServiceUnavailableException(result.errorMessage || 'Mail sending failed');
        }
        return result;
    }
    async sendMailSafe(input) {
        const startedAt = Date.now();
        let config = null;
        try {
            config =
                (await this.settingsService.getMailTransportConfig());
            const transport = this.createTransport(config);
            const info = (await transport.sendMail({
                from: config.fromName
                    ? `${config.fromName} <${config.fromEmail}>`
                    : config.fromEmail,
                to: input.to,
                subject: input.subject,
                text: input.text,
                html: input.html,
            }));
            return {
                success: true,
                messageId: String(info.messageId || ''),
                response: String(info.response || ''),
                durationMs: Date.now() - startedAt,
            };
        }
        catch (error) {
            return {
                success: false,
                errorCode: error.code,
                errorMessage: this.normalizeSendError(error, config),
                durationMs: Date.now() - startedAt,
            };
        }
    }
    createTransport(config) {
        if (!config.enabled) {
            throw new common_1.BadRequestException('Mail config is disabled');
        }
        if (!config.smtpHost ||
            !config.smtpPort ||
            !config.smtpUser ||
            !config.smtpPass ||
            !config.fromEmail) {
            throw new common_1.BadRequestException('Mail config is incomplete, please configure SMTP host/port/user/password/fromEmail');
        }
        if (config.smtpHost.includes('://')) {
            throw new common_1.BadRequestException('smtpHost must be hostname only (for example: smtp.qq.com), do not include http:// or https://');
        }
        return nodemailer_1.default.createTransport({
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
    normalizeSendError(error, config) {
        const raw = error.message || 'Mail send failed';
        const lowerRaw = raw.toLowerCase();
        if (lowerRaw.includes('wrong version number') ||
            lowerRaw.includes('tls_validate_record_header')) {
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
    escapeHtml(input) {
        return input
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [system_settings_service_1.SystemSettingsService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map