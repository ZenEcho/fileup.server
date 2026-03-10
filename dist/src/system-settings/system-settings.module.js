"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const system_settings_controller_1 = require("./system-settings.controller");
const captcha_service_1 = require("./captcha.service");
const mailer_service_1 = require("./mailer.service");
const mail_verification_policy_service_1 = require("./mail-verification-policy.service");
const secret_crypto_service_1 = require("./secret-crypto.service");
const system_settings_service_1 = require("./system-settings.service");
let SystemSettingsModule = class SystemSettingsModule {
};
exports.SystemSettingsModule = SystemSettingsModule;
exports.SystemSettingsModule = SystemSettingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [system_settings_controller_1.SystemSettingsController],
        providers: [
            secret_crypto_service_1.SecretCryptoService,
            system_settings_service_1.SystemSettingsService,
            mailer_service_1.MailerService,
            captcha_service_1.CaptchaService,
            mail_verification_policy_service_1.MailVerificationPolicyService,
        ],
        exports: [
            system_settings_service_1.SystemSettingsService,
            mailer_service_1.MailerService,
            captcha_service_1.CaptchaService,
            mail_verification_policy_service_1.MailVerificationPolicyService,
        ],
    })
], SystemSettingsModule);
//# sourceMappingURL=system-settings.module.js.map