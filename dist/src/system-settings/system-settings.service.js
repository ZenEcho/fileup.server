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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../prisma/prisma-client");
const prisma_service_1 = require("../prisma/prisma.service");
const secret_crypto_service_1 = require("./secret-crypto.service");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SINGLETON_CONFIG_ID = 'default';
let SystemSettingsService = class SystemSettingsService {
    prisma;
    cryptoService;
    constructor(prisma, cryptoService) {
        this.prisma = prisma;
        this.cryptoService = cryptoService;
    }
    async getMailConfig() {
        const row = await this.ensureMailConfig();
        return this.mapMailConfigView(row);
    }
    async updateMailConfig(payload, operatorId) {
        if (payload.smtpPort !== undefined) {
            const port = Number(payload.smtpPort);
            if (!Number.isInteger(port) || port < 1 || port > 65535) {
                throw new common_1.BadRequestException('smtpPort must be an integer between 1 and 65535');
            }
        }
        if (payload.fromEmail !== undefined && payload.fromEmail !== null) {
            const fromEmail = payload.fromEmail.trim();
            if (fromEmail && !EMAIL_PATTERN.test(fromEmail)) {
                throw new common_1.BadRequestException('fromEmail format is invalid');
            }
        }
        const updateData = {
            provider: payload.provider,
            smtpHost: this.normalizeNullableString(payload.smtpHost),
            smtpPort: payload.smtpPort !== undefined ? Number(payload.smtpPort) : undefined,
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
        }
        else if (payload.smtpPass) {
            updateData.smtpPassEncrypted = this.cryptoService.encrypt(payload.smtpPass);
        }
        const row = await this.prisma.systemMailConfig.upsert({
            where: {
                id: SINGLETON_CONFIG_ID,
            },
            create: {
                id: SINGLETON_CONFIG_ID,
                provider: payload.provider || prisma_client_1.MailProvider.SMTP,
                smtpHost: this.normalizeNullableString(payload.smtpHost),
                smtpPort: payload.smtpPort !== undefined ? Number(payload.smtpPort) : null,
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
        await this.writeAuditLog(prisma_client_1.SystemConfigAuditCategory.MAIL, 'UPDATE_MAIL_CONFIG', operatorId, true, 'Mail config updated by admin');
        return this.mapMailConfigView(row);
    }
    async getMailTransportConfig() {
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
    async getCaptchaConfig() {
        const row = await this.ensureCaptchaConfig();
        return this.mapCaptchaConfigView(row);
    }
    async updateCaptchaConfig(payload, operatorId) {
        if (payload.scoreThreshold !== undefined) {
            const score = Number(payload.scoreThreshold);
            if (Number.isNaN(score) || score < 0 || score > 1) {
                throw new common_1.BadRequestException('scoreThreshold must be between 0 and 1');
            }
        }
        const updateData = {
            provider: payload.provider,
            siteKey: this.normalizeNullableString(payload.siteKey),
            enabled: payload.enabled,
            registerEnabled: payload.registerEnabled,
            loginEnabled: payload.loginEnabled,
            scoreThreshold: payload.scoreThreshold !== undefined
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
        }
        else if (payload.secret) {
            updateData.secretEncrypted = this.cryptoService.encrypt(payload.secret);
        }
        const row = await this.prisma.systemCaptchaConfig.upsert({
            where: {
                id: SINGLETON_CONFIG_ID,
            },
            create: {
                id: SINGLETON_CONFIG_ID,
                provider: payload.provider || prisma_client_1.CaptchaProvider.TURNSTILE,
                siteKey: this.normalizeNullableString(payload.siteKey),
                secretEncrypted: payload.secret
                    ? this.cryptoService.encrypt(payload.secret)
                    : null,
                enabled: Boolean(payload.enabled),
                registerEnabled: payload.registerEnabled !== undefined
                    ? Boolean(payload.registerEnabled)
                    : true,
                loginEnabled: Boolean(payload.loginEnabled),
                scoreThreshold: payload.scoreThreshold !== undefined
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
        await this.writeAuditLog(prisma_client_1.SystemConfigAuditCategory.CAPTCHA, 'UPDATE_CAPTCHA_CONFIG', operatorId, true, 'Captcha config updated by admin');
        return this.mapCaptchaConfigView(row);
    }
    async getCaptchaSecretConfig() {
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
    async writeAuditLog(category, action, operatorId, success, detail) {
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
    async ensureMailConfig() {
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
    async ensureCaptchaConfig() {
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
    mapMailConfigView(row) {
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
    mapCaptchaConfigView(row) {
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
    normalizeNullableString(input) {
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
};
exports.SystemSettingsService = SystemSettingsService;
exports.SystemSettingsService = SystemSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        secret_crypto_service_1.SecretCryptoService])
], SystemSettingsService);
//# sourceMappingURL=system-settings.service.js.map