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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const prisma_client_1 = require("../prisma/prisma-client");
const change_my_password_dto_1 = require("./dto/change-my-password.dto");
const request_email_change_dto_1 = require("./dto/request-email-change.dto");
const request_local_bind_dto_1 = require("./dto/request-local-bind.dto");
const update_my_profile_dto_1 = require("./dto/update-my-profile.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getMyProfile(req) {
        const user = req.user;
        return this.usersService.getMyProfile(user.userId);
    }
    updateMyProfile(req, payload) {
        const user = req.user;
        return this.usersService.updateMyProfile(user.userId, payload);
    }
    changeMyPassword(req, payload) {
        const user = req.user;
        return this.usersService.changeMyPassword(user.userId, payload);
    }
    requestMyEmailChange(req, payload) {
        const user = req.user;
        return this.usersService.requestMyEmailChange(user.userId, payload.email);
    }
    resendMyEmailChangeVerification(req) {
        const user = req.user;
        return this.usersService.resendMyEmailChangeVerification(user.userId);
    }
    requestMyLocalBind(req, payload) {
        const user = req.user;
        return this.usersService.requestMyLocalBind(user.userId, payload);
    }
    resendMyLocalBindVerification(req) {
        const user = req.user;
        return this.usersService.resendMyLocalBindVerification(user.userId);
    }
    resendMyVerification(req) {
        const user = req.user;
        return this.usersService.resendMyVerification(user.userId);
    }
    unbindMyOAuthProvider(req, provider) {
        const user = req.user;
        return this.usersService.unbindMyOAuthProvider(user.userId, this.normalizeOAuthProvider(provider));
    }
    findAllForAdmin(req) {
        this.assertAdmin(req.user);
        return this.usersService.findAllForAdmin();
    }
    updateRole(req, id, role) {
        const user = req.user;
        this.assertAdmin(user);
        if (role !== 'ADMIN' && role !== 'DEVELOPER') {
            throw new common_1.BadRequestException('USER_ROLE_INVALID');
        }
        return this.usersService.updateRoleByAdmin(user.userId, id, role);
    }
    normalizeOAuthProvider(provider) {
        const normalized = provider.trim().toUpperCase();
        if (normalized === 'GITHUB' || normalized === 'GOOGLE') {
            return normalized;
        }
        throw new common_1.BadRequestException('USER_OAUTH_PROVIDER_INVALID');
    }
    assertAdmin(user) {
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can access this endpoint');
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Patch)('me/profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_my_profile_dto_1.UpdateMyProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateMyProfile", null);
__decorate([
    (0, common_1.Patch)('me/password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_my_password_dto_1.ChangeMyPasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "changeMyPassword", null);
__decorate([
    (0, common_1.Post)('me/email-change/request'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_email_change_dto_1.RequestEmailChangeDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "requestMyEmailChange", null);
__decorate([
    (0, common_1.Post)('me/email-change/resend'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resendMyEmailChangeVerification", null);
__decorate([
    (0, common_1.Post)('me/local-bind/request'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_local_bind_dto_1.RequestLocalBindDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "requestMyLocalBind", null);
__decorate([
    (0, common_1.Post)('me/local-bind/resend'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resendMyLocalBindVerification", null);
__decorate([
    (0, common_1.Post)('me/resend-verification'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resendMyVerification", null);
__decorate([
    (0, common_1.Delete)('me/oauth/:provider'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('provider')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "unbindMyOAuthProvider", null);
__decorate([
    (0, common_1.Get)('admin/list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllForAdmin", null);
__decorate([
    (0, common_1.Patch)(':id/role'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateRole", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map