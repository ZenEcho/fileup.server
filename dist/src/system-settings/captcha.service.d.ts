import { CaptchaProvider } from '../prisma/prisma-client';
import { SystemSettingsService } from './system-settings.service';
export type CaptchaAction = 'register' | 'login';
export declare class CaptchaService {
    private readonly settingsService;
    constructor(settingsService: SystemSettingsService);
    getPublicConfig(): Promise<{
        enabled: boolean;
        provider: CaptchaProvider;
        siteKey: string | null;
        registerEnabled: boolean;
        loginEnabled: boolean;
    }>;
    validateCaptcha(action: CaptchaAction, token: string | undefined, remoteIp?: string): Promise<void>;
    private verifyTurnstile;
    private verifyRecaptcha;
}
