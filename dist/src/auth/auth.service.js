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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_client_1 = require("../prisma/prisma-client");
const captcha_service_1 = require("../system-settings/captcha.service");
const mail_verification_policy_service_1 = require("../system-settings/mail-verification-policy.service");
const users_service_1 = require("../users/users.service");
const email_verification_service_1 = require("./email-verification.service");
const password_service_1 = require("./password.service");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,32}$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;
const OAUTH_BIND_STATE_PREFIX = 'bind:';
let AuthService = class AuthService {
    usersService;
    jwtService;
    passwordService;
    emailVerificationService;
    captchaService;
    mailVerificationPolicyService;
    constructor(usersService, jwtService, passwordService, emailVerificationService, captchaService, mailVerificationPolicyService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.passwordService = passwordService;
        this.emailVerificationService = emailVerificationService;
        this.captchaService = captchaService;
        this.mailVerificationPolicyService = mailVerificationPolicyService;
    }
    async validateOAuthUser(provider, profile) {
        const user = await this.usersService.findOrCreateByOAuth({
            provider,
            providerUserId: profile.id,
            username: profile.username,
            avatar: profile.avatar,
            email: profile.email,
            emailVerified: Boolean(profile.emailVerified),
        });
        if (user.status !== prisma_client_1.UserStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Account is disabled');
        }
        await this.usersService.touchLastLogin(user.id);
        return {
            id: user.id,
            username: user.username,
            role: user.role,
        };
    }
    async handleOAuthLogin(provider, profile) {
        const payload = await this.validateOAuthUser(provider, profile);
        return this.login(payload);
    }
    async handleGithubLogin(profile) {
        return this.handleOAuthLogin('GITHUB', profile);
    }
    async handleGoogleLogin(profile) {
        return this.handleOAuthLogin('GOOGLE', profile);
    }
    async createOAuthBindAuthorization(userId, provider) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.status !== prisma_client_1.UserStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Account is disabled');
        }
        if (!user.passwordHash) {
            throw new common_1.BadRequestException(this.resolveLocalOnlyError(provider));
        }
        const isBound = await this.usersService.isOAuthProviderBound(userId, provider);
        if (isBound) {
            throw new common_1.ConflictException(this.resolveAlreadyBoundError(provider));
        }
        const token = this.jwtService.sign({
            mode: 'OAUTH_BIND',
            provider,
            sub: user.id,
        }, {
            expiresIn: '10m',
        });
        const state = `${OAUTH_BIND_STATE_PREFIX}${token}`;
        const backendBase = (process.env['BACKEND_PUBLIC_URL'] || 'http://localhost:3000/api').replace(/\/$/, '');
        return {
            authorizeUrl: `${backendBase}/auth/${provider.toLowerCase()}?state=${encodeURIComponent(state)}`,
            provider,
        };
    }
    async createGithubBindAuthorization(userId) {
        return this.createOAuthBindAuthorization(userId, 'GITHUB');
    }
    async createGoogleBindAuthorization(userId) {
        return this.createOAuthBindAuthorization(userId, 'GOOGLE');
    }
    async bindOAuthAccountWithState(state, provider, profile) {
        const payload = this.verifyOAuthBindState(state);
        if (payload.provider !== provider) {
            throw new common_1.UnauthorizedException('OAUTH_BIND_STATE_PROVIDER_MISMATCH');
        }
        return this.usersService.bindOAuthAccount(payload.sub, {
            provider,
            providerUserId: profile.id,
            username: profile.username,
            avatar: profile.avatar,
            email: profile.email,
            emailVerified: Boolean(profile.emailVerified),
        });
    }
    async bindGithubAccountWithState(state, profile) {
        return this.bindOAuthAccountWithState(state, 'GITHUB', profile);
    }
    async bindGoogleAccountWithState(state, profile) {
        return this.bindOAuthAccountWithState(state, 'GOOGLE', profile);
    }
    isOAuthBindState(rawState) {
        const state = rawState.trim();
        if (!state) {
            return false;
        }
        if (state.startsWith(OAUTH_BIND_STATE_PREFIX)) {
            return true;
        }
        const decoded = this.jwtService.decode(state);
        return Boolean(decoded &&
            decoded.mode === 'OAUTH_BIND' &&
            typeof decoded.sub === 'string' &&
            (decoded.provider === 'GITHUB' || decoded.provider === 'GOOGLE'));
    }
    verifyOAuthBindState(rawState) {
        const state = rawState.trim();
        if (!state) {
            throw new common_1.BadRequestException('OAUTH_BIND_STATE_REQUIRED');
        }
        const token = state.startsWith(OAUTH_BIND_STATE_PREFIX)
            ? state.slice(OAUTH_BIND_STATE_PREFIX.length)
            : state;
        try {
            const payload = this.jwtService.verify(token);
            if (payload.mode !== 'OAUTH_BIND' || !payload.sub || !payload.provider) {
                throw new common_1.UnauthorizedException('OAUTH_BIND_STATE_INVALID');
            }
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException('OAUTH_BIND_STATE_INVALID');
        }
    }
    verifyGithubBindState(rawState) {
        const payload = this.verifyOAuthBindState(rawState);
        if (payload.provider !== 'GITHUB') {
            throw new common_1.UnauthorizedException('GITHUB_BIND_STATE_INVALID');
        }
        return payload.sub;
    }
    async register(payload, clientIp) {
        const username = this.normalizeUsername(payload.username);
        const email = this.normalizeEmail(payload.email);
        const password = this.normalizePassword(payload.password);
        this.validateRegisterInput(username, email, password);
        await this.captchaService.validateCaptcha('register', payload.captchaToken, clientIp);
        const [existingByEmail, existingByUsername] = await Promise.all([
            this.usersService.findByEmail(email),
            this.usersService.findByUsername(username),
        ]);
        if (existingByEmail) {
            throw new common_1.ConflictException('Email already in use');
        }
        if (existingByUsername) {
            throw new common_1.ConflictException('Username already in use');
        }
        const mailVerificationEnforced = await this.mailVerificationPolicyService.isMailVerificationEnforced();
        const passwordHash = await this.passwordService.hashPassword(password);
        const user = await this.usersService.createLocalUser({
            username,
            email,
            passwordHash,
            emailVerifyRequired: mailVerificationEnforced,
        });
        if (!mailVerificationEnforced) {
            return {
                verificationSent: false,
                requiresEmailVerification: false,
                email: this.maskEmail(email),
                expiresAt: null,
                mailEnabled: false,
                emailVerificationEnforced: false,
                verificationRequiredNow: false,
            };
        }
        try {
            const result = await this.emailVerificationService.sendVerificationForUser({
                userId: user.id,
                email,
                username,
            });
            return {
                ...result,
                mailEnabled: true,
                emailVerificationEnforced: true,
                verificationRequiredNow: true,
            };
        }
        catch (error) {
            await this.usersService.deleteById(user.id).catch(() => {
                return null;
            });
            throw new common_1.ServiceUnavailableException(`Registration succeeded but sending verification email failed: ${error.message}`);
        }
    }
    async loginWithPassword(payload, clientIp) {
        const rawIdentifier = this.normalizeIdentifier(payload.identifier);
        const password = this.normalizePassword(payload.password);
        if (!rawIdentifier || !password) {
            throw new common_1.BadRequestException('identifier and password are required');
        }
        this.validatePassword(password);
        await this.captchaService.validateCaptcha('login', payload.captchaToken, clientIp);
        const loginByEmail = rawIdentifier.includes('@');
        const identifier = loginByEmail
            ? rawIdentifier.toLowerCase()
            : rawIdentifier;
        const candidates = await this.usersService.findLocalLoginCandidates(identifier, loginByEmail);
        const mailVerificationEnforced = await this.mailVerificationPolicyService.isMailVerificationEnforced();
        for (const candidate of candidates) {
            if (!candidate.passwordHash) {
                continue;
            }
            const matched = await this.passwordService.verifyPassword(password, candidate.passwordHash);
            if (!matched) {
                continue;
            }
            if (candidate.status !== prisma_client_1.UserStatus.ACTIVE) {
                throw new common_1.UnauthorizedException('Account is disabled');
            }
            if (this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(candidate, mailVerificationEnforced)) {
                throw new common_1.UnauthorizedException('Email is not verified. Please verify your email first.');
            }
            await this.usersService.touchLastLogin(candidate.id);
            return this.login({
                id: candidate.id,
                username: candidate.username,
                role: candidate.role,
            });
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async verifyEmailByToken(token) {
        const result = await this.emailVerificationService.verifyByToken(token);
        return this.issueTokenAfterVerification(result);
    }
    async verifyEmailByCode(email, code) {
        const result = await this.emailVerificationService.verifyByCode(email, code);
        return this.issueTokenAfterVerification(result);
    }
    resendEmailVerification(email) {
        return this.emailVerificationService.resend(email);
    }
    confirmPasswordReset(payload) {
        return this.usersService.confirmPasswordReset(payload);
    }
    getCaptchaConfig() {
        return this.captchaService.getPublicConfig();
    }
    login(user) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async issueTokenAfterVerification(result) {
        const user = await this.usersService.findOne(result.userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.status !== prisma_client_1.UserStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Account is disabled');
        }
        await this.usersService.touchLastLogin(user.id);
        return {
            ...result,
            ...this.login({
                id: user.id,
                username: user.username,
                role: user.role,
            }),
        };
    }
    validateRegisterInput(username, email, password) {
        if (!username || !email || !password) {
            throw new common_1.BadRequestException('username, email and password are required');
        }
        if (!USERNAME_PATTERN.test(username)) {
            throw new common_1.BadRequestException('username must be 3-32 chars and only contain letters, numbers, _ or -');
        }
        if (!EMAIL_PATTERN.test(email)) {
            throw new common_1.BadRequestException('invalid email format');
        }
        this.validatePassword(password);
    }
    validatePassword(password) {
        if (password.length < MIN_PASSWORD_LENGTH ||
            password.length > MAX_PASSWORD_LENGTH) {
            throw new common_1.BadRequestException(`password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters`);
        }
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
    resolveLocalOnlyError(provider) {
        return provider === 'GITHUB'
            ? 'USER_GITHUB_BIND_LOCAL_ONLY'
            : 'USER_GOOGLE_BIND_LOCAL_ONLY';
    }
    resolveAlreadyBoundError(provider) {
        return provider === 'GITHUB'
            ? 'USER_GITHUB_ALREADY_BOUND'
            : 'USER_GOOGLE_ALREADY_BOUND';
    }
    normalizeUsername(value) {
        return typeof value === 'string' ? value.trim() : '';
    }
    normalizeEmail(value) {
        return typeof value === 'string' ? value.trim().toLowerCase() : '';
    }
    normalizeIdentifier(value) {
        return typeof value === 'string' ? value.trim() : '';
    }
    normalizePassword(value) {
        return typeof value === 'string' ? value : '';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        password_service_1.PasswordService,
        email_verification_service_1.EmailVerificationService,
        captcha_service_1.CaptchaService,
        mail_verification_policy_service_1.MailVerificationPolicyService])
], AuthService);
//# sourceMappingURL=auth.service.js.map