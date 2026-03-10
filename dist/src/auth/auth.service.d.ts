import { JwtService } from '@nestjs/jwt';
import { CaptchaService } from '../system-settings/captcha.service';
import { MailVerificationPolicyService } from '../system-settings/mail-verification-policy.service';
import { UsersService } from '../users/users.service';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailVerificationService } from './email-verification.service';
import { PasswordService } from './password.service';
export type OAuthProviderType = 'GITHUB' | 'GOOGLE';
export interface OAuthProfile {
    id: string;
    username: string;
    avatar: string | null;
    email: string | null;
    emailVerified?: boolean;
}
interface UserPayload {
    id: string;
    username: string;
    role: string;
}
interface OauthBindStatePayload {
    mode: 'OAUTH_BIND';
    provider: OAuthProviderType;
    sub: string;
    iat: number;
    exp: number;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly passwordService;
    private readonly emailVerificationService;
    private readonly captchaService;
    private readonly mailVerificationPolicyService;
    constructor(usersService: UsersService, jwtService: JwtService, passwordService: PasswordService, emailVerificationService: EmailVerificationService, captchaService: CaptchaService, mailVerificationPolicyService: MailVerificationPolicyService);
    validateOAuthUser(provider: OAuthProviderType, profile: OAuthProfile): Promise<UserPayload>;
    handleOAuthLogin(provider: OAuthProviderType, profile: OAuthProfile): Promise<{
        access_token: string;
    }>;
    handleGithubLogin(profile: OAuthProfile): Promise<{
        access_token: string;
    }>;
    handleGoogleLogin(profile: OAuthProfile): Promise<{
        access_token: string;
    }>;
    createOAuthBindAuthorization(userId: string, provider: OAuthProviderType): Promise<{
        authorizeUrl: string;
        provider: OAuthProviderType;
    }>;
    createGithubBindAuthorization(userId: string): Promise<{
        authorizeUrl: string;
        provider: OAuthProviderType;
    }>;
    createGoogleBindAuthorization(userId: string): Promise<{
        authorizeUrl: string;
        provider: OAuthProviderType;
    }>;
    bindOAuthAccountWithState(state: string, provider: OAuthProviderType, profile: OAuthProfile): Promise<{
        bound: boolean;
        alreadyBound: boolean;
        provider: "GITHUB" | "GOOGLE";
    }>;
    bindGithubAccountWithState(state: string, profile: OAuthProfile): Promise<{
        bound: boolean;
        alreadyBound: boolean;
        provider: "GITHUB" | "GOOGLE";
    }>;
    bindGoogleAccountWithState(state: string, profile: OAuthProfile): Promise<{
        bound: boolean;
        alreadyBound: boolean;
        provider: "GITHUB" | "GOOGLE";
    }>;
    isOAuthBindState(rawState: string): boolean;
    verifyOAuthBindState(rawState: string): OauthBindStatePayload;
    verifyGithubBindState(rawState: string): string;
    register(payload: RegisterDto, clientIp?: string): Promise<{
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
    loginWithPassword(payload: LoginDto, clientIp?: string): Promise<{
        access_token: string;
    }>;
    verifyEmailByToken(token: string): Promise<{
        access_token: string;
        verified: boolean;
        email: string;
        userId: string;
        purpose: string;
    }>;
    verifyEmailByCode(email: string, code: string): Promise<{
        access_token: string;
        verified: boolean;
        email: string;
        userId: string;
        purpose: string;
    }>;
    resendEmailVerification(email: string): Promise<import("./email-verification.service").RegisterResendResult>;
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
    login(user: UserPayload): {
        access_token: string;
    };
    private issueTokenAfterVerification;
    private validateRegisterInput;
    private validatePassword;
    private maskEmail;
    private resolveLocalOnlyError;
    private resolveAlreadyBoundError;
    private normalizeUsername;
    private normalizeEmail;
    private normalizeIdentifier;
    private normalizePassword;
}
export {};
