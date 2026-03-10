import { SystemSettingsService } from './system-settings.service';
export interface SendMailResult {
    success: boolean;
    messageId?: string;
    response?: string;
    errorCode?: string;
    errorMessage?: string;
    durationMs: number;
}
type VerificationScene = 'REGISTER' | 'EMAIL_CHANGE' | 'LOCAL_BIND';
export declare class MailerService {
    private readonly settingsService;
    constructor(settingsService: SystemSettingsService);
    sendVerificationEmail(payload: {
        to: string;
        username: string;
        verifyUrl: string;
        code: string;
        scene?: VerificationScene;
    }): Promise<SendMailResult>;
    sendPasswordResetEmail(payload: {
        to: string;
        username: string;
        resetUrl: string;
        expiresAt: Date;
    }): Promise<SendMailResult>;
    sendTemporaryPasswordEmail(payload: {
        to: string;
        username: string;
        temporaryPassword: string;
    }): Promise<SendMailResult>;
    sendTestEmail(payload: {
        to: string;
        subject?: string;
        operatorId: string;
    }): Promise<SendMailResult>;
    private resolveVerificationTemplate;
    private sendMailOrThrow;
    private sendMailSafe;
    private createTransport;
    private normalizeSendError;
    private escapeHtml;
}
export {};
