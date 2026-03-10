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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const confirm_password_reset_dto_1 = require("./dto/confirm-password-reset.dto");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const resend_verification_dto_1 = require("./dto/resend-verification.dto");
const verify_email_code_dto_1 = require("./dto/verify-email-code.dto");
const github_auth_guard_1 = require("./github-auth.guard");
const google_auth_guard_1 = require("./google-auth.guard");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async githubLogin() {
    }
    async googleLogin() {
    }
    createGithubBindAuthorization(req) {
        const user = req.user;
        return this.authService.createGithubBindAuthorization(user.userId);
    }
    createGoogleBindAuthorization(req) {
        const user = req.user;
        return this.authService.createGoogleBindAuthorization(user.userId);
    }
    async githubLoginCallback(req, res) {
        return this.handleOAuthCallback(req, res, 'GITHUB');
    }
    async googleLoginCallback(req, res) {
        return this.handleOAuthCallback(req, res, 'GOOGLE');
    }
    register(req, payload) {
        return this.authService.register(payload, req.ip);
    }
    loginWithPassword(req, payload) {
        return this.authService.loginWithPassword(payload, req.ip);
    }
    verifyEmailByToken(token) {
        return this.authService.verifyEmailByToken(token || '');
    }
    verifyEmailByCode(payload) {
        return this.authService.verifyEmailByCode(payload.email, payload.code);
    }
    resendEmailVerification(payload) {
        return this.authService.resendEmailVerification(payload.email);
    }
    confirmPasswordReset(payload) {
        return this.authService.confirmPasswordReset(payload);
    }
    getCaptchaConfig() {
        return this.authService.getCaptchaConfig();
    }
    getProfile(req) {
        return req.user;
    }
    async handleOAuthCallback(req, res, provider) {
        const profile = req.user;
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const state = typeof req.query.state === 'string' ? req.query.state.trim() : '';
        const providerKey = provider.toLowerCase();
        if (state && this.authService.isOAuthBindState(state)) {
            try {
                await this.authService.bindOAuthAccountWithState(state, provider, profile);
                res.redirect(`${frontendUrl}/auth/callback?bind=success&provider=${providerKey}`);
            }
            catch (error) {
                const reason = this.resolveErrorReason(error);
                res.redirect(`${frontendUrl}/auth/callback?bind=error&provider=${providerKey}&reason=${encodeURIComponent(reason)}`);
            }
            return;
        }
        try {
            const jwt = await this.authService.handleOAuthLogin(provider, profile);
            res.redirect(`${frontendUrl}/auth/callback?token=${jwt.access_token}`);
        }
        catch (error) {
            const reason = this.resolveErrorReason(error);
            res.redirect(`${frontendUrl}/auth/callback?oauth=error&provider=${providerKey}&reason=${encodeURIComponent(reason)}`);
        }
    }
    resolveErrorReason(error) {
        const responseMessage = error.response?.message;
        if (Array.isArray(responseMessage)) {
            return responseMessage[0] || 'UNKNOWN_ERROR';
        }
        if (typeof responseMessage === 'string' && responseMessage.trim()) {
            return responseMessage;
        }
        const message = error.message;
        if (typeof message === 'string' && message.trim()) {
            return message;
        }
        return 'UNKNOWN_ERROR';
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('github'),
    (0, common_1.UseGuards)(github_auth_guard_1.GithubAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "githubLogin", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Post)('github/bind'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createGithubBindAuthorization", null);
__decorate([
    (0, common_1.Post)('google/bind'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createGoogleBindAuthorization", null);
__decorate([
    (0, common_1.Get)('github/callback'),
    (0, common_1.UseGuards)(github_auth_guard_1.GithubAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "githubLoginCallback", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLoginCallback", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginWithPassword", null);
__decorate([
    (0, common_1.Get)('email/verify'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmailByToken", null);
__decorate([
    (0, common_1.Post)('email/verify-code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_code_dto_1.VerifyEmailCodeDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmailByCode", null);
__decorate([
    (0, common_1.Post)('email/resend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_verification_dto_1.ResendVerificationDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resendEmailVerification", null);
__decorate([
    (0, common_1.Post)('password-reset/confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_password_reset_dto_1.ConfirmPasswordResetDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "confirmPasswordReset", null);
__decorate([
    (0, common_1.Get)('captcha/config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCaptchaConfig", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map