"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const prisma_client_1 = require("../prisma/prisma-client");
const prisma_service_1 = require("../prisma/prisma.service");
const mailer_service_1 = require("../system-settings/mailer.service");
const mail_verification_policy_service_1 = require("../system-settings/mail-verification-policy.service");
const DEFAULT_VERIFY_TOKEN_TTL_MINUTES = 30;
const DEFAULT_RESEND_COOLDOWN_SECONDS = 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_PATTERN = /^\d{6}$/;
let EmailVerificationService = class EmailVerificationService {
    prisma;
    mailerService;
    mailVerificationPolicyService;
    constructor(prisma, mailerService, mailVerificationPolicyService) {
        this.prisma = prisma;
        this.mailerService = mailerService;
        this.mailVerificationPolicyService = mailVerificationPolicyService;
    }
    async sendVerificationForUser(payload) {
        const email = this.normalizeEmail(payload.email);
        const purpose = payload.purpose || prisma_client_1.EmailVerificationPurpose.REGISTER;
        if (!EMAIL_PATTERN.test(email)) {
            throw new common_1.BadRequestException('valid email is required for verification');
        }
        const issued = await this.issueVerificationToken(payload.userId, email, purpose);
        const frontendUrl = process.env['FRONTEND_URL'] || 'http://localhost:5173';
        const verifyUrl = `${frontendUrl}auth/verify-email?token=${encodeURIComponent(issued.token)}`;
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
    async verifyByToken(rawToken) {
        const token = rawToken.trim();
        if (!token) {
            throw new common_1.BadRequestException('token is required');
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
            throw new common_1.UnauthorizedException('Verification token is invalid or expired');
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
    async verifyByCode(rawEmail, rawCode) {
        const email = this.normalizeEmail(rawEmail);
        const code = rawCode.trim();
        if (!EMAIL_PATTERN.test(email) || !CODE_PATTERN.test(code)) {
            throw new common_1.BadRequestException('email or code format is invalid');
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
            throw new common_1.UnauthorizedException('Verification code is invalid or expired');
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
    async resend(emailInput) {
        const email = this.normalizeEmail(emailInput);
        if (!EMAIL_PATTERN.test(email)) {
            throw new common_1.BadRequestException('email format is invalid');
        }
        const mailVerificationEnforced = await this.mailVerificationPolicyService.isMailVerificationEnforced();
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
            return {
                resent: true,
                email: this.maskEmail(email),
                mailEnabled: true,
                emailVerificationEnforced: true,
                verificationRequiredNow: true,
            };
        }
        const verificationRequiredNow = this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(user, mailVerificationEnforced);
        if (!verificationRequiredNow) {
            return {
                resent: false,
                alreadyVerified: Boolean(user.emailVerifiedAt),
                email: this.maskEmail(email),
                reason: 'VERIFICATION_NOT_REQUIRED',
                mailEnabled: true,
                emailVerificationEnforced: true,
                verificationRequiredNow: false,
            };
        }
        this.assertResendCooldown(user.lastVerificationSentAt);
        await this.sendVerificationForUser({
            userId: user.id,
            email,
            username: user.username,
            purpose: prisma_client_1.EmailVerificationPurpose.REGISTER,
        });
        return {
            resent: true,
            email: this.maskEmail(email),
            mailEnabled: true,
            emailVerificationEnforced: true,
            verificationRequiredNow: true,
        };
    }
    async resendForPendingPurpose(payload) {
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
            throw new common_1.UnauthorizedException('User not found');
        }
        const expectedPendingPurpose = this.resolvePendingEmailPurpose(payload.purpose);
        if (!user.pendingEmail ||
            user.pendingEmailPurpose !== expectedPendingPurpose) {
            throw new common_1.BadRequestException('No pending email verification request found');
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
    async issueVerificationToken(userId, email, purpose) {
        const token = (0, node_crypto_1.randomBytes)(24).toString('base64url');
        const code = String((0, node_crypto_1.randomInt)(100000, 1000000));
        const tokenHash = this.hashValue(token);
        const codeHash = this.hashValue(code);
        const ttlMinutes = Number(process.env['EMAIL_VERIFY_TOKEN_TTL_MINUTES'] ||
            DEFAULT_VERIFY_TOKEN_TTL_MINUTES);
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
    async consumeVerification(record) {
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
    async applyVerificationToUser(tx, record, now) {
        if (record.purpose === prisma_client_1.EmailVerificationPurpose.REGISTER) {
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
            throw new common_1.UnauthorizedException('User not found');
        }
        if (record.purpose === prisma_client_1.EmailVerificationPurpose.EMAIL_CHANGE) {
            if (user.pendingEmail !== record.email ||
                user.pendingEmailPurpose !== prisma_client_1.PendingEmailPurpose.EMAIL_CHANGE) {
                throw new common_1.UnauthorizedException('Pending email change request is invalid');
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
        if (user.pendingEmail !== record.email ||
            user.pendingEmailPurpose !== prisma_client_1.PendingEmailPurpose.LOCAL_BIND ||
            !user.pendingPasswordHash) {
            throw new common_1.UnauthorizedException('Pending local account bind request is invalid');
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
    hashValue(value) {
        return (0, node_crypto_1.createHash)('sha256').update(value).digest('hex');
    }
    normalizeEmail(input) {
        return input.trim().toLowerCase();
    }
    maskEmail(email) {
        const [name, domain] = email.split('@');
        if (!name || !domain) {
            return '***';
        }
        if (name.length <= 2) {
            return `${name[0] || '*'}***@${domain}`;
        }
        return `${name.slice(0, 2)}***@${domain}`;
    }
    isExpired(expiresAt) {
        return expiresAt.getTime() <= Date.now();
    }
    resolveVerificationScene(purpose) {
        if (purpose === prisma_client_1.EmailVerificationPurpose.EMAIL_CHANGE) {
            return 'EMAIL_CHANGE';
        }
        if (purpose === prisma_client_1.EmailVerificationPurpose.LOCAL_BIND) {
            return 'LOCAL_BIND';
        }
        return 'REGISTER';
    }
    resolvePendingEmailPurpose(purpose) {
        if (purpose === prisma_client_1.EmailVerificationPurpose.EMAIL_CHANGE) {
            return prisma_client_1.PendingEmailPurpose.EMAIL_CHANGE;
        }
        return prisma_client_1.PendingEmailPurpose.LOCAL_BIND;
    }
    assertResendCooldown(lastVerificationSentAt) {
        if (!lastVerificationSentAt) {
            return;
        }
        const cooldownSeconds = Number(process.env['EMAIL_VERIFY_RESEND_COOLDOWN_SECONDS'] ||
            DEFAULT_RESEND_COOLDOWN_SECONDS);
        const elapsedMs = Date.now() - lastVerificationSentAt.getTime();
        const cooldownMs = cooldownSeconds * 1000;
        if (elapsedMs < cooldownMs) {
            const retryAfter = Math.max(1, Math.ceil((cooldownMs - elapsedMs) / 1000));
            throw new common_1.HttpException(`Please wait ${retryAfter}s before requesting a new verification email`, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
    }
};
exports.EmailVerificationService = EmailVerificationService;
exports.EmailVerificationService = EmailVerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.MailerService,
        mail_verification_policy_service_1.MailVerificationPolicyService])
], EmailVerificationService);
//# sourceMappingURL=email-verification.service.js.map