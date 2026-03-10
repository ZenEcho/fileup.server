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
exports.CaptchaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../prisma/prisma-client");
const system_settings_service_1 = require("./system-settings.service");
let CaptchaService = class CaptchaService {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getPublicConfig() {
        const config = await this.settingsService.getCaptchaConfig();
        return {
            enabled: config.enabled,
            provider: config.provider,
            siteKey: config.siteKey,
            registerEnabled: config.registerEnabled,
            loginEnabled: config.loginEnabled,
        };
    }
    async validateCaptcha(action, token, remoteIp) {
        const config = await this.settingsService.getCaptchaSecretConfig();
        if (!config.enabled) {
            return;
        }
        if (action === 'register' && !config.registerEnabled) {
            return;
        }
        if (action === 'login' && !config.loginEnabled) {
            return;
        }
        const captchaToken = (token || '').trim();
        if (!captchaToken) {
            throw new common_1.BadRequestException('captchaToken is required');
        }
        if (!config.siteKey || !config.secret) {
            throw new common_1.BadRequestException('Captcha config is incomplete, missing siteKey or secret');
        }
        const result = config.provider === prisma_client_1.CaptchaProvider.RECAPTCHA
            ? await this.verifyRecaptcha(config.secret, captchaToken, remoteIp)
            : await this.verifyTurnstile(config.secret, captchaToken, remoteIp);
        if (!result.success) {
            throw new common_1.UnauthorizedException(`Captcha validation failed${result['error-codes']?.length
                ? `: ${result['error-codes'].join(',')}`
                : ''}`);
        }
        if (typeof result.score === 'number' &&
            result.score < config.scoreThreshold) {
            throw new common_1.UnauthorizedException('Captcha score too low');
        }
    }
    async verifyTurnstile(secret, token, remoteIp) {
        const body = new URLSearchParams({
            secret,
            response: token,
        });
        if (remoteIp) {
            body.set('remoteip', remoteIp);
        }
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body,
        });
        if (!res.ok) {
            throw new common_1.UnauthorizedException('Captcha provider request failed');
        }
        return (await res.json());
    }
    async verifyRecaptcha(secret, token, remoteIp) {
        const body = new URLSearchParams({
            secret,
            response: token,
        });
        if (remoteIp) {
            body.set('remoteip', remoteIp);
        }
        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body,
        });
        if (!res.ok) {
            throw new common_1.UnauthorizedException('Captcha provider request failed');
        }
        return (await res.json());
    }
};
exports.CaptchaService = CaptchaService;
exports.CaptchaService = CaptchaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [system_settings_service_1.SystemSettingsService])
], CaptchaService);
//# sourceMappingURL=captcha.service.js.map