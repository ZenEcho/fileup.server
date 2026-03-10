import { Module } from '@nestjs/common';
import { SystemSettingsController } from './system-settings.controller';
import { CaptchaService } from './captcha.service';
import { MailerService } from './mailer.service';
import { MailVerificationPolicyService } from './mail-verification-policy.service';
import { SecretCryptoService } from './secret-crypto.service';
import { SystemSettingsService } from './system-settings.service';

@Module({
  controllers: [SystemSettingsController],
  providers: [
    SecretCryptoService,
    SystemSettingsService,
    MailerService,
    CaptchaService,
    MailVerificationPolicyService,
  ],
  exports: [
    SystemSettingsService,
    MailerService,
    CaptchaService,
    MailVerificationPolicyService,
  ],
})
export class SystemSettingsModule {}
