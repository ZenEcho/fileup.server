export interface AuthUser {
    userId: string;
    username: string;
    displayName?: string | null;
    role: string;
    avatar: string | null;
    email?: string | null;
    pendingEmail?: string | null;
    pendingEmailPurpose?: 'EMAIL_CHANGE' | 'LOCAL_BIND' | null;
    emailVerified?: boolean;
    emailVerifyRequired?: boolean;
    mailEnabled?: boolean;
    emailVerificationEnforced?: boolean;
    verificationRequiredNow?: boolean;
    authProvider?: 'GITHUB' | 'GOOGLE' | 'LOCAL' | 'MIXED';
    accountType?: 'GITHUB' | 'GOOGLE' | 'LOCAL' | 'MIXED';
    authProviders?: Array<'LOCAL' | 'GITHUB' | 'GOOGLE'>;
    status?: 'ACTIVE' | 'BANNED' | 'PENDING';
    lastLoginAt?: Date | null;
}
