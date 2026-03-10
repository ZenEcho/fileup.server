import { EmailVerificationPurpose } from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../system-settings/mailer.service';
import { MailVerificationPolicyService } from '../system-settings/mail-verification-policy.service';
type PendingVerificationPurpose = Exclude<EmailVerificationPurpose, 'REGISTER'>;
export interface RegisterResendResult {
    resent: boolean;
    email: string;
    alreadyVerified?: boolean;
    reason?: 'MAIL_DISABLED' | 'VERIFICATION_NOT_REQUIRED';
    mailEnabled: boolean;
    emailVerificationEnforced: boolean;
    verificationRequiredNow: boolean;
}
export declare class EmailVerificationService {
    private readonly prisma;
    private readonly mailerService;
    private readonly mailVerificationPolicyService;
    constructor(prisma: PrismaService, mailerService: MailerService, mailVerificationPolicyService: MailVerificationPolicyService);
    sendVerificationForUser(payload: {
        userId: string;
        email: string;
        username: string;
        purpose?: EmailVerificationPurpose;
    }): Promise<{
        verificationSent: boolean;
        requiresEmailVerification: boolean;
        email: string;
        expiresAt: Date;
        purpose: EmailVerificationPurpose;
    }>;
    verifyByToken(rawToken: string): Promise<{
        verified: boolean;
        email: string;
        userId: string;
        purpose: EmailVerificationPurpose;
    }>;
    verifyByCode(rawEmail: string, rawCode: string): Promise<{
        verified: boolean;
        email: string;
        userId: string;
        purpose: EmailVerificationPurpose;
    }>;
    resend(emailInput: string): Promise<RegisterResendResult>;
    resendForPendingPurpose(payload: {
        userId: string;
        purpose: PendingVerificationPurpose;
    }): Promise<{
        resent: boolean;
        email: string;
        purpose: PendingVerificationPurpose;
    }>;
    private issueVerificationToken;
    private consumeVerification;
    private applyVerificationToUser;
    private hashValue;
    private normalizeEmail;
    private maskEmail;
    private isExpired;
    private resolveVerificationScene;
    private resolvePendingEmailPurpose;
    private assertResendCooldown;
}
export {};
