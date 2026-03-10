import { Request, Response } from 'express';
import { AuthService, OAuthProviderType } from './auth.service';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { VerifyEmailCodeDto } from './dto/verify-email-code.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    githubLogin(): Promise<void>;
    googleLogin(): Promise<void>;
    createGithubBindAuthorization(req: Request): Promise<{
        authorizeUrl: string;
        provider: OAuthProviderType;
    }>;
    createGoogleBindAuthorization(req: Request): Promise<{
        authorizeUrl: string;
        provider: OAuthProviderType;
    }>;
    githubLoginCallback(req: Request, res: Response): Promise<void>;
    googleLoginCallback(req: Request, res: Response): Promise<void>;
    register(req: Request, payload: RegisterDto): Promise<{
        verificationSent: boolean;
        requiresEmailVerification: boolean;
        email: string;
        expiresAt: null;
        mailEnabled: boolean;
        emailVerificationEnforced: boolean;
        verificationRequiredNow: boolean;
    } | {
        mailEnabled: boolean;
        emailVerificationEnforced: boolean;
        verificationRequiredNow: boolean;
        verificationSent: boolean;
        requiresEmailVerification: boolean;
        email: string;
        expiresAt: Date;
        purpose: import("../prisma/prisma-client").EmailVerificationPurpose;
    }>;
    loginWithPassword(req: Request, payload: LoginDto): Promise<{
        access_token: string;
    }>;
    verifyEmailByToken(token: string): Promise<{
        access_token: string;
        verified: boolean;
        email: string;
        userId: string;
        purpose: string;
    }>;
    verifyEmailByCode(payload: VerifyEmailCodeDto): Promise<{
        access_token: string;
        verified: boolean;
        email: string;
        userId: string;
        purpose: string;
    }>;
    resendEmailVerification(payload: ResendVerificationDto): Promise<import("./email-verification.service").RegisterResendResult>;
    confirmPasswordReset(payload: ConfirmPasswordResetDto): Promise<{
        reset: boolean;
    }>;
    getCaptchaConfig(): Promise<{
        enabled: boolean;
        provider: import("../prisma/prisma-client").CaptchaProvider;
        siteKey: string | null;
        registerEnabled: boolean;
        loginEnabled: boolean;
    }>;
    getProfile(req: Request): {
        userId: string;
        username: string;
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
        status?: 'ACTIVE' | 'BANNED' | 'PENDING';
        authProvider?: 'GITHUB' | 'GOOGLE' | 'LOCAL' | 'MIXED';
        accountType?: 'GITHUB' | 'GOOGLE' | 'LOCAL' | 'MIXED';
        authProviders?: Array<'LOCAL' | 'GITHUB' | 'GOOGLE'>;
    };
    private handleOAuthCallback;
    private resolveErrorReason;
}
