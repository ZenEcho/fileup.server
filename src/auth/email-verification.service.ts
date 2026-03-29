import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, randomBytes, randomInt } from 'node:crypto';
import {
  EmailVerificationPurpose,
  PendingEmailPurpose,
  Prisma,
} from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../system-settings/mailer.service';
import { MailVerificationPolicyService } from '../system-settings/mail-verification-policy.service';

const DEFAULT_VERIFY_TOKEN_TTL_MINUTES = 30;
const DEFAULT_RESEND_COOLDOWN_SECONDS = 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_PATTERN = /^\d{6}$/;

type PendingVerificationPurpose = Exclude<EmailVerificationPurpose, 'REGISTER'>;

export interface RegisterResendResult {
  resent: boolean;
  email: string;
  reason?: 'MAIL_DISABLED';
  mailEnabled: boolean;
  emailVerificationEnforced: boolean;
  verificationRequiredNow: boolean;
}

interface VerificationRecord {
  id: string;
  userId: string;
  email: string;
  purpose: EmailVerificationPurpose;
}

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly mailVerificationPolicyService: MailVerificationPolicyService,
  ) {}

  async sendVerificationForUser(payload: {
    userId: string;
    email: string;
    username: string;
    purpose?: EmailVerificationPurpose;
  }) {
    const email = this.normalizeEmail(payload.email);
    const purpose = payload.purpose || EmailVerificationPurpose.REGISTER;

    if (!EMAIL_PATTERN.test(email)) {
      throw new BadRequestException('valid email is required for verification');
    }

    const issued = await this.issueVerificationToken(
      payload.userId,
      email,
      purpose,
    );

    const frontendUrl = process.env['FRONTEND_URL'] || 'http://localhost:5173';
    const verifyUrl = `${frontendUrl}auth/verify-email?token=${encodeURIComponent(
      issued.token,
    )}`;

    await this.mailerService.sendVerificationEmail({
      to: email,
      username: payload.username,
      verifyUrl,
      code: issued.code,
      scene: this.resolveVerificationScene(purpose),
    });

    return {
      verificationSent: true,
      requiresEmailVerification: true,
      email: this.maskEmail(email),
      expiresAt: issued.expiresAt,
      purpose,
    };
  }

  async verifyByToken(rawToken: string) {
    const token = rawToken.trim();
    if (!token) {
      throw new BadRequestException('token is required');
    }

    const tokenHash = this.hashValue(token);
    const record = await this.prisma.emailVerificationToken.findFirst({
      where: {
        tokenHash,
        consumedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    if (!record || this.isExpired(record.expiresAt)) {
      throw new UnauthorizedException(
        'Verification token is invalid or expired',
      );
    }

    await this.consumeVerification({
      id: record.id,
      userId: record.userId,
      email: record.email,
      purpose: record.purpose,
    });

    return {
      verified: true,
      email: this.maskEmail(record.email),
      userId: record.userId,
      purpose: record.purpose,
    };
  }

  async verifyByCode(rawEmail: string, rawCode: string) {
    const email = this.normalizeEmail(rawEmail);
    const code = rawCode.trim();

    if (!EMAIL_PATTERN.test(email) || !CODE_PATTERN.test(code)) {
      throw new BadRequestException('email or code format is invalid');
    }

    const codeHash = this.hashValue(code);
    const record = await this.prisma.emailVerificationToken.findFirst({
      where: {
        email,
        codeHash,
        consumedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    if (!record || this.isExpired(record.expiresAt)) {
      throw new UnauthorizedException(
        'Verification code is invalid or expired',
      );
    }

    await this.consumeVerification({
      id: record.id,
      userId: record.userId,
      email: record.email,
      purpose: record.purpose,
    });

    return {
      verified: true,
      email: this.maskEmail(record.email),
      userId: record.userId,
      purpose: record.purpose,
    };
  }

  async resend(emailInput: string): Promise<RegisterResendResult> {
    const email = this.normalizeEmail(emailInput);
    if (!EMAIL_PATTERN.test(email)) {
      throw new BadRequestException('email format is invalid');
    }

    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();
    const genericResponse: RegisterResendResult = {
      resent: true,
      email: this.maskEmail(email),
      mailEnabled: true,
      emailVerificationEnforced: true,
      verificationRequiredNow: true,
    };

    if (!mailVerificationEnforced) {
      return {
        resent: false,
        email: this.maskEmail(email),
        reason: 'MAIL_DISABLED',
        mailEnabled: false,
        emailVerificationEnforced: false,
        verificationRequiredNow: false,
      };
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        passwordHash: true,
        emailVerifiedAt: true,
        lastVerificationSentAt: true,
      },
    });

    if (!user) {
      return genericResponse;
    }

    const verificationRequiredNow =
      this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(
        user,
        mailVerificationEnforced,
      );

    if (!verificationRequiredNow) {
      return genericResponse;
    }

    if (!this.isResendAllowed(user.lastVerificationSentAt)) {
      return genericResponse;
    }

    await this.sendVerificationForUser({
      userId: user.id,
      email,
      username: user.username,
      purpose: EmailVerificationPurpose.REGISTER,
    });

    return genericResponse;
  }

  async resendForPendingPurpose(payload: {
    userId: string;
    purpose: PendingVerificationPurpose;
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        username: true,
        pendingEmail: true,
        pendingEmailPurpose: true,
        lastVerificationSentAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const expectedPendingPurpose = this.resolvePendingEmailPurpose(
      payload.purpose,
    );

    if (
      !user.pendingEmail ||
      user.pendingEmailPurpose !== expectedPendingPurpose
    ) {
      throw new BadRequestException(
        'No pending email verification request found',
      );
    }

    this.assertResendCooldown(user.lastVerificationSentAt);

    await this.sendVerificationForUser({
      userId: user.id,
      email: user.pendingEmail,
      username: user.username,
      purpose: payload.purpose,
    });

    return {
      resent: true,
      email: this.maskEmail(user.pendingEmail),
      purpose: payload.purpose,
    };
  }

  private async issueVerificationToken(
    userId: string,
    email: string,
    purpose: EmailVerificationPurpose,
  ) {
    const token = randomBytes(24).toString('base64url');
    const code = String(randomInt(100000, 1000000));
    const tokenHash = this.hashValue(token);
    const codeHash = this.hashValue(code);

    const ttlMinutes = Number(
      process.env['EMAIL_VERIFY_TOKEN_TTL_MINUTES'] ||
        DEFAULT_VERIFY_TOKEN_TTL_MINUTES,
    );

    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    await this.prisma.$transaction([
      this.prisma.emailVerificationToken.create({
        data: {
          userId,
          email,
          purpose,
          tokenHash,
          codeHash,
          expiresAt,
        },
      }),
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          lastVerificationSentAt: new Date(),
        },
      }),
    ]);

    return {
      token,
      code,
      expiresAt,
    };
  }

  private async consumeVerification(record: VerificationRecord) {
    const now = new Date();

    await this.prisma.$transaction(async (tx) => {
      await tx.emailVerificationToken.update({
        where: {
          id: record.id,
        },
        data: {
          consumedAt: now,
        },
      });

      await tx.emailVerificationToken.updateMany({
        where: {
          userId: record.userId,
          purpose: record.purpose,
          consumedAt: null,
          id: {
            not: record.id,
          },
        },
        data: {
          consumedAt: now,
        },
      });

      await this.applyVerificationToUser(tx, record, now);
    });
  }

  private async applyVerificationToUser(
    tx: Prisma.TransactionClient,
    record: VerificationRecord,
    now: Date,
  ) {
    if (record.purpose === EmailVerificationPurpose.REGISTER) {
      await tx.user.update({
        where: {
          id: record.userId,
        },
        data: {
          emailVerifiedAt: now,
          emailVerifyRequired: false,
        },
      });
      return;
    }

    const user = await tx.user.findUnique({
      where: {
        id: record.userId,
      },
      select: {
        id: true,
        pendingEmail: true,
        pendingEmailPurpose: true,
        pendingPasswordHash: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (record.purpose === EmailVerificationPurpose.EMAIL_CHANGE) {
      if (
        user.pendingEmail !== record.email ||
        user.pendingEmailPurpose !== PendingEmailPurpose.EMAIL_CHANGE
      ) {
        throw new UnauthorizedException(
          'Pending email change request is invalid',
        );
      }

      await tx.user.update({
        where: {
          id: record.userId,
        },
        data: {
          email: record.email,
          pendingEmail: null,
          pendingEmailPurpose: null,
          emailVerifiedAt: now,
          emailVerifyRequired: false,
        },
      });

      return;
    }

    if (
      user.pendingEmail !== record.email ||
      user.pendingEmailPurpose !== PendingEmailPurpose.LOCAL_BIND ||
      !user.pendingPasswordHash
    ) {
      throw new UnauthorizedException(
        'Pending local account bind request is invalid',
      );
    }

    await tx.user.update({
      where: {
        id: record.userId,
      },
      data: {
        email: record.email,
        passwordHash: user.pendingPasswordHash,
        pendingEmail: null,
        pendingEmailPurpose: null,
        pendingPasswordHash: null,
        emailVerifiedAt: now,
        emailVerifyRequired: false,
        passwordUpdatedAt: now,
      },
    });
  }

  private hashValue(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }

  private normalizeEmail(input: string) {
    return input.trim().toLowerCase();
  }

  private maskEmail(email: string) {
    const [name, domain] = email.split('@');
    if (!name || !domain) {
      return '***';
    }

    if (name.length <= 2) {
      return `${name[0] || '*'}***@${domain}`;
    }

    return `${name.slice(0, 2)}***@${domain}`;
  }

  private isExpired(expiresAt: Date) {
    return expiresAt.getTime() <= Date.now();
  }

  private resolveVerificationScene(
    purpose: EmailVerificationPurpose,
  ): 'REGISTER' | 'EMAIL_CHANGE' | 'LOCAL_BIND' {
    if (purpose === EmailVerificationPurpose.EMAIL_CHANGE) {
      return 'EMAIL_CHANGE';
    }

    if (purpose === EmailVerificationPurpose.LOCAL_BIND) {
      return 'LOCAL_BIND';
    }

    return 'REGISTER';
  }

  private resolvePendingEmailPurpose(
    purpose: PendingVerificationPurpose,
  ): PendingEmailPurpose {
    if (purpose === EmailVerificationPurpose.EMAIL_CHANGE) {
      return PendingEmailPurpose.EMAIL_CHANGE;
    }

    return PendingEmailPurpose.LOCAL_BIND;
  }

  private assertResendCooldown(lastVerificationSentAt: Date | null) {
    if (!lastVerificationSentAt) {
      return;
    }

    const cooldownSeconds = Number(
      process.env['EMAIL_VERIFY_RESEND_COOLDOWN_SECONDS'] ||
        DEFAULT_RESEND_COOLDOWN_SECONDS,
    );

    const elapsedMs = Date.now() - lastVerificationSentAt.getTime();
    const cooldownMs = cooldownSeconds * 1000;
    if (elapsedMs < cooldownMs) {
      const retryAfter = Math.max(
        1,
        Math.ceil((cooldownMs - elapsedMs) / 1000),
      );
      throw new HttpException(
        `Please wait ${retryAfter}s before requesting a new verification email`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  private isResendAllowed(lastVerificationSentAt: Date | null) {
    try {
      this.assertResendCooldown(lastVerificationSentAt);
      return true;
    } catch {
      return false;
    }
  }
}
