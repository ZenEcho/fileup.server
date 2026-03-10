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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_client_1 = require("../prisma/prisma-client");
const mail_verification_policy_service_1 = require("../system-settings/mail-verification-policy.service");
const users_service_1 = require("../users/users.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    usersService;
    mailVerificationPolicyService;
    constructor(configService, usersService, mailVerificationPolicyService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET') || 'secretKey',
        });
        this.usersService = usersService;
        this.mailVerificationPolicyService = mailVerificationPolicyService;
    }
    async validate(payload) {
        const user = await this.usersService.findOne(payload.sub);
        if (!user || user.status !== prisma_client_1.UserStatus.ACTIVE) {
            return null;
        }
        const mailVerificationEnforced = await this.mailVerificationPolicyService.isMailVerificationEnforced();
        const authProviders = this.resolveAuthProviders({
            githubId: user.githubId,
            passwordHash: user.passwordHash,
            oauthAccounts: user.oauthAccounts || [],
        });
        const authProvider = authProviders.length === 1
            ? authProviders[0]
            : authProviders.length > 1
                ? 'MIXED'
                : 'LOCAL';
        const verificationRequiredNow = this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(user, mailVerificationEnforced);
        const status = this.mailVerificationPolicyService.resolveAccountStatus(user, mailVerificationEnforced);
        return {
            userId: user.id,
            username: user.username,
            displayName: user.displayName,
            role: user.role,
            avatar: user.avatar,
            email: user.email,
            pendingEmail: user.pendingEmail,
            pendingEmailPurpose: user.pendingEmailPurpose,
            emailVerified: Boolean(user.emailVerifiedAt),
            emailVerifyRequired: user.emailVerifyRequired,
            mailEnabled: mailVerificationEnforced,
            emailVerificationEnforced: mailVerificationEnforced,
            verificationRequiredNow,
            authProvider,
            accountType: authProvider,
            authProviders,
            status,
            lastLoginAt: user.lastLoginAt,
        };
    }
    resolveAuthProviders(input) {
        const providers = [];
        if (input.passwordHash) {
            providers.push('LOCAL');
        }
        if (input.githubId ||
            input.oauthAccounts.some((item) => item.provider === prisma_client_1.OAuthProvider.GITHUB && item.isActive !== false)) {
            providers.push('GITHUB');
        }
        if (input.oauthAccounts.some((item) => item.provider === prisma_client_1.OAuthProvider.GOOGLE && item.isActive !== false)) {
            providers.push('GOOGLE');
        }
        return providers;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService,
        mail_verification_policy_service_1.MailVerificationPolicyService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map