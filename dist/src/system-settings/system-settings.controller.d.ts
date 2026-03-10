import { Request } from 'express';
import { TestMailConfigDto } from './dto/test-mail-config.dto';
import { UpdateCaptchaConfigDto } from './dto/update-captcha-config.dto';
import { UpdateMailConfigDto } from './dto/update-mail-config.dto';
import { MailerService } from './mailer.service';
import { SystemSettingsService } from './system-settings.service';
export declare class SystemSettingsController {
    private readonly systemSettingsService;
    private readonly mailerService;
    constructor(systemSettingsService: SystemSettingsService, mailerService: MailerService);
    getMailConfig(req: Request): Promise<import("./system-settings.service").MailConfigView>;
    updateMailConfig(req: Request, payload: UpdateMailConfigDto): Promise<import("./system-settings.service").MailConfigView>;
    testMailConfig(req: Request, payload: TestMailConfigDto): Promise<import("./mailer.service").SendMailResult>;
    getCaptchaConfig(req: Request): Promise<import("./system-settings.service").CaptchaConfigView>;
    updateCaptchaConfig(req: Request, payload: UpdateCaptchaConfigDto): Promise<import("./system-settings.service").CaptchaConfigView>;
    private assertAdmin;
}
