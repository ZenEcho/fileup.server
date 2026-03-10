import { Injectable } from '@nestjs/common';
import { UserStatus } from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';

const SYSTEM_MAIL_CONFIG_ID = 'default';

export type AccountStatusView = 'ACTIVE' | 'PENDING' | 'BANNED';

interface VerificationPolicyUser {
  passwordHash: string | null;
  email: string | null;
  emailVerifiedAt: Date | null;
}

interface AccountStatusPolicyUser extends VerificationPolicyUser {
  status: UserStatus;
}

@Injectable()
export class MailVerificationPolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async isMailVerificationEnforced(): Promise<boolean> {
    const config = await this.prisma.systemMailConfig.findUnique({
      where: {
        id: SYSTEM_MAIL_CONFIG_ID,
      },
      select: {
        enabled: true,
      },
    });

    return Boolean(config?.enabled);
  }

  shouldRequireEmailVerificationNow(
    user: VerificationPolicyUser,
    mailVerificationEnforced: boolean,
  ): boolean {
    if (!mailVerificationEnforced) {
      return false;
    }

    if (!user.passwordHash || !user.email) {
      return false;
    }

    return !user.emailVerifiedAt;
  }

  resolveAccountStatus(
    user: AccountStatusPolicyUser,
    mailVerificationEnforced: boolean,
  ): AccountStatusView {
    if (user.status !== UserStatus.ACTIVE) {
      return 'BANNED';
    }

    if (
      this.shouldRequireEmailVerificationNow(user, mailVerificationEnforced)
    ) {
      return 'PENDING';
    }

    return 'ACTIVE';
  }
}
