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
exports.AdminUsersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const prisma_client_1 = require("../prisma/prisma-client");
const admin_update_user_role_dto_1 = require("./dto/admin-update-user-role.dto");
const admin_update_user_status_dto_1 = require("./dto/admin-update-user-status.dto");
const admin_reset_password_dto_1 = require("./dto/admin-reset-password.dto");
const admin_update_user_dto_1 = require("./dto/admin-update-user.dto");
const users_service_1 = require("./users.service");
let AdminUsersController = class AdminUsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findUsers(req, keyword, role, status, page, pageSize) {
        this.assertAdmin(req.user);
        if (role && role !== 'ADMIN' && role !== 'DEVELOPER') {
            throw new common_1.BadRequestException('USER_ROLE_INVALID');
        }
        if (status &&
            status !== 'ACTIVE' &&
            status !== 'BANNED' &&
            status !== 'PENDING') {
            throw new common_1.BadRequestException('USER_STATUS_INVALID');
        }
        const query = {
            keyword,
            role,
            status,
            page: page ? Number(page) : undefined,
            pageSize: pageSize ? Number(pageSize) : undefined,
        };
        return this.usersService.findAdminUsers(query);
    }
    findUserById(req, id) {
        this.assertAdmin(req.user);
        return this.usersService.findAdminUserById(id);
    }
    updateUser(req, id, payload) {
        const user = req.user;
        this.assertAdmin(user);
        return this.usersService.updateUserByAdmin(user.userId, id, payload);
    }
    updateRole(req, id, payload) {
        const user = req.user;
        this.assertAdmin(user);
        return this.usersService.updateRoleByAdmin(user.userId, id, payload.role);
    }
    updateStatus(req, id, payload) {
        const user = req.user;
        this.assertAdmin(user);
        return this.usersService.updateStatusByAdmin(user.userId, id, payload.status);
    }
    resetPassword(req, id, payload) {
        const user = req.user;
        this.assertAdmin(user);
        return this.usersService.resetPasswordByAdmin(user.userId, id, payload);
    }
    resendVerification(req, id) {
        const user = req.user;
        this.assertAdmin(user);
        return this.usersService.resendVerificationByAdmin(user.userId, id);
    }
    forceUnbindOAuthProvider(req, id, provider) {
        const user = req.user;
        this.assertAdmin(user);
        return this.usersService.forceUnbindOAuthProviderByAdmin(user.userId, id, this.normalizeOAuthProvider(provider));
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
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('keyword')),
    __param(2, (0, common_1.Query)('role')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "findUserById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_update_user_dto_1.AdminUpdateUserDto]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)(':id/role'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_update_user_role_dto_1.AdminUpdateUserRoleDto]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_update_user_status_dto_1.AdminUpdateUserStatusDto]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/password-reset'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_reset_password_dto_1.AdminResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)(':id/resend-verification'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "resendVerification", null);
__decorate([
    (0, common_1.Delete)(':id/oauth/:provider'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('provider')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "forceUnbindOAuthProvider", null);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, common_1.Controller)('admin/users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AdminUsersController);
//# sourceMappingURL=admin-users.controller.js.map