import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { MailVerificationPolicyService } from '../system-settings/mail-verification-policy.service';
import { UsersService } from '../users/users.service';
interface JwtPayload {
    sub: string;
    username: string;
    role: string;
    iat: number;
    exp: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    private readonly mailVerificationPolicyService;
    constructor(configService: ConfigService, usersService: UsersService, mailVerificationPolicyService: MailVerificationPolicyService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        username: string;
        displayName: string | null;
        role: import("../prisma/prisma-client").Role;
        avatar: string | null;
        email: string | null;
        pendingEmail: string | null;
        pendingEmailPurpose: import("../prisma/prisma-client").PendingEmailPurpose | null;
        emailVerified: boolean;
        emailVerifyRequired: boolean;
        mailEnabled: boolean;
        emailVerificationEnforced: boolean;
        verificationRequiredNow: boolean;
        authProvider: string;
        accountType: string;
        authProviders: ("GITHUB" | "GOOGLE" | "LOCAL")[];
        status: import("../system-settings/mail-verification-policy.service").AccountStatusView;
        lastLoginAt: Date | null;
    } | null>;
    private resolveAuthProviders;
}
export {};
