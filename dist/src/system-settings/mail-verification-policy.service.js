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
exports.MailVerificationPolicyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../prisma/prisma-client");
const prisma_service_1 = require("../prisma/prisma.service");
const SYSTEM_MAIL_CONFIG_ID = 'default';
let MailVerificationPolicyService = class MailVerificationPolicyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async isMailVerificationEnforced() {
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
    shouldRequireEmailVerificationNow(user, mailVerificationEnforced) {
        if (!mailVerificationEnforced) {
            return false;
        }
        if (!user.passwordHash || !user.email) {
            return false;
        }
        return !user.emailVerifiedAt;
    }
    resolveAccountStatus(user, mailVerificationEnforced) {
        if (user.status !== prisma_client_1.UserStatus.ACTIVE) {
            return 'BANNED';
        }
        if (this.shouldRequireEmailVerificationNow(user, mailVerificationEnforced)) {
            return 'PENDING';
        }
        return 'ACTIVE';
    }
};
exports.MailVerificationPolicyService = MailVerificationPolicyService;
exports.MailVerificationPolicyService = MailVerificationPolicyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MailVerificationPolicyService);
//# sourceMappingURL=mail-verification-policy.service.js.map