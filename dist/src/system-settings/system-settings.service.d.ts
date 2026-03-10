import { CaptchaProvider, MailProvider, SystemConfigAuditCategory } from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCaptchaConfigDto } from './dto/update-captcha-config.dto';
import { UpdateMailConfigDto } from './dto/update-mail-config.dto';
import { SecretCryptoService } from './secret-crypto.service';
export interface MailConfigView {
    id: string;
    provider: MailProvider;
    smtpHost: string | null;
    smtpPort: number | null;
    smtpSecure: boolean;
    smtpUser: string | null;
    fromEmail: string | null;
    fromName: string | null;
    enabled: boolean;
    smtpPassConfigured: boolean;
    updatedAt: Date;
}
export interface MailTransportConfig {
    provider: MailProvider;
    smtpHost: string;
    smtpPort: number;
    smtpSecure: boolean;
    smtpUser: string;
    smtpPass: string;
    fromEmail: string;
    fromName: string;
    enabled: boolean;
}
export interface CaptchaConfigView {
    id: string;
    provider: CaptchaProvider;
    siteKey: string | null;
    enabled: boolean;
    registerEnabled: boolean;
    loginEnabled: boolean;
    scoreThreshold: number;
    secretConfigured: boolean;
    updatedAt: Date;
}
export interface CaptchaSecretConfig {
    provider: CaptchaProvider;
    siteKey: string;
    secret: string;
    enabled: boolean;
    registerEnabled: boolean;
    loginEnabled: boolean;
    scoreThreshold: number;
}
export declare class SystemSettingsService {
    private readonly prisma;
    private readonly cryptoService;
    constructor(prisma: PrismaService, cryptoService: SecretCryptoService);
    getMailConfig(): Promise<MailConfigView>;
    updateMailConfig(payload: UpdateMailConfigDto, operatorId: string): Promise<MailConfigView>;
    getMailTransportConfig(): Promise<MailTransportConfig>;
    getCaptchaConfig(): Promise<CaptchaConfigView>;
    updateCaptchaConfig(payload: UpdateCaptchaConfigDto, operatorId: string): Promise<CaptchaConfigView>;
    getCaptchaSecretConfig(): Promise<CaptchaSecretConfig>;
    writeAuditLog(category: SystemConfigAuditCategory, action: string, operatorId: string | null, success: boolean, detail: string): Promise<void>;
    private ensureMailConfig;
    private ensureCaptchaConfig;
    private mapMailConfigView;
    private mapCaptchaConfigView;
    private normalizeNullableString;
}
