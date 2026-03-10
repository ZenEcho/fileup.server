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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettingsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const test_mail_config_dto_1 = require("./dto/test-mail-config.dto");
const update_captcha_config_dto_1 = require("./dto/update-captcha-config.dto");
const update_mail_config_dto_1 = require("./dto/update-mail-config.dto");
const mailer_service_1 = require("./mailer.service");
const system_settings_service_1 = require("./system-settings.service");
let SystemSettingsController = class SystemSettingsController {
    systemSettingsService;
    mailerService;
    constructor(systemSettingsService, mailerService) {
        this.systemSettingsService = systemSettingsService;
        this.mailerService = mailerService;
    }
    async getMailConfig(req) {
        this.assertAdmin(req.user);
        return this.systemSettingsService.getMailConfig();
    }
    async updateMailConfig(req, payload) {
        const user = req.user;
        this.assertAdmin(user);
        return this.systemSettingsService.updateMailConfig(payload, user.userId);
    }
    async testMailConfig(req, payload) {
        const user = req.user;
        this.assertAdmin(user);
        return this.mailerService.sendTestEmail({
            to: payload.toEmail,
            subject: payload.subject,
            operatorId: user.userId,
        });
    }
    async getCaptchaConfig(req) {
        this.assertAdmin(req.user);
        return this.systemSettingsService.getCaptchaConfig();
    }
    async updateCaptchaConfig(req, payload) {
        const user = req.user;
        this.assertAdmin(user);
        return this.systemSettingsService.updateCaptchaConfig(payload, user.userId);
    }
    assertAdmin(user) {
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can access system settings');
        }
    }
};
exports.SystemSettingsController = SystemSettingsController;
__decorate([
    (0, common_1.Get)('mail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SystemSettingsController.prototype, "getMailConfig", null);
__decorate([
    (0, common_1.Patch)('mail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_mail_config_dto_1.UpdateMailConfigDto]),
    __metadata("design:returntype", Promise)
], SystemSettingsController.prototype, "updateMailConfig", null);
__decorate([
    (0, common_1.Post)('mail/test'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, test_mail_config_dto_1.TestMailConfigDto]),
    __metadata("design:returntype", Promise)
], SystemSettingsController.prototype, "testMailConfig", null);
__decorate([
    (0, common_1.Get)('captcha'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SystemSettingsController.prototype, "getCaptchaConfig", null);
__decorate([
    (0, common_1.Patch)('captcha'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_captcha_config_dto_1.UpdateCaptchaConfigDto]),
    __metadata("design:returntype", Promise)
], SystemSettingsController.prototype, "updateCaptchaConfig", null);
exports.SystemSettingsController = SystemSettingsController = __decorate([
    (0, common_1.Controller)('admin/settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [system_settings_service_1.SystemSettingsService,
        mailer_service_1.MailerService])
], SystemSettingsController);
//# sourceMappingURL=system-settings.controller.js.map