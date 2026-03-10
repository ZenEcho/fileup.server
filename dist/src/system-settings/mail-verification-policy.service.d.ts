import { UserStatus } from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
export type AccountStatusView = 'ACTIVE' | 'PENDING' | 'BANNED';
interface VerificationPolicyUser {
    passwordHash: string | null;
    email: string | null;
    emailVerifiedAt: Date | null;
}
interface AccountStatusPolicyUser extends VerificationPolicyUser {
    status: UserStatus;
}
export declare class MailVerificationPolicyService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    isMailVerificationEnforced(): Promise<boolean>;
    shouldRequireEmailVerificationNow(user: VerificationPolicyUser, mailVerificationEnforced: boolean): boolean;
    resolveAccountStatus(user: AccountStatusPolicyUser, mailVerificationEnforced: boolean): AccountStatusView;
}
export {};
