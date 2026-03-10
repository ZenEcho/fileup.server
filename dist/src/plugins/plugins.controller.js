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
exports.PluginsController = void 0;
const common_1 = require("@nestjs/common");
const plugins_service_1 = require("./plugins.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const prisma_client_1 = require("../prisma/prisma-client");
let PluginsController = class PluginsController {
    pluginsService;
    constructor(pluginsService) {
        this.pluginsService = pluginsService;
    }
    findAll(status) {
        return this.pluginsService.findAll(status);
    }
    findPending(req) {
        const user = req.user;
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can view pending plugins');
        }
        return this.pluginsService.findAllPending();
    }
    findMyPlugins(req) {
        const user = req.user;
        return this.pluginsService.findByAuthor(user.userId);
    }
    findReviews(id) {
        return this.pluginsService.findReviews(id);
    }
    upsertReview(req, id, rating, content) {
        const user = req.user;
        return this.pluginsService.upsertReview(id, user.userId, {
            rating: Number(rating),
            content: typeof content === 'string' ? content : '',
        });
    }
    replyReview(req, id, reviewId, content) {
        const user = req.user;
        return this.pluginsService.replyReview(id, reviewId, user.userId, user.role, typeof content === 'string' ? content : '');
    }
    deleteReview(req, id, reviewId) {
        const user = req.user;
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can delete reviews');
        }
        return this.pluginsService.deleteReview(id, reviewId);
    }
    findVersionActions(req, id) {
        const user = req.user;
        return this.pluginsService.findVersionActions(id, user.userId, user.role);
    }
    findVersions(req, id, includeDeleted) {
        const user = req.user;
        return this.pluginsService.findVersions(id, user.userId, user.role, includeDeleted === 'true');
    }
    rollbackVersion(req, id, version, reason) {
        const user = req.user;
        return this.pluginsService.rollbackVersion(id, version, user.userId, user.role, reason);
    }
    deleteVersion(req, id, version, reason) {
        const user = req.user;
        return this.pluginsService.deleteVersion(id, version, user.userId, user.role, reason);
    }
    findOne(id, allStatus) {
        if (allStatus === 'true') {
            return this.pluginsService.findOneAnyStatus(id);
        }
        return this.pluginsService.findOne(id);
    }
    async recordDownload(req, id) {
        const forwardedFor = req.headers['x-forwarded-for'];
        const rawIp = (typeof forwardedFor === 'string'
            ? forwardedFor
            : Array.isArray(forwardedFor)
                ? forwardedFor[0]
                : undefined) ||
            req.ip ||
            req.socket.remoteAddress;
        const finalIp = rawIp?.split(',')[0] || 'unknown';
        return this.pluginsService.recordDownload(id, finalIp);
    }
    create(req, createPluginDto) {
        const user = req.user;
        return this.pluginsService.create(user.userId, createPluginDto);
    }
    audit(req, id, version, status) {
        const user = req.user;
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can audit plugins');
        }
        return this.pluginsService.audit(id, version, status, user.userId);
    }
    async toggleVisibility(req, id, isPublic, mode) {
        const user = req.user;
        const plugin = await this.pluginsService.findOne(id);
        if (!plugin)
            throw new common_1.ForbiddenException('Plugin not found');
        if (user.role !== 'ADMIN' && plugin.authorId !== user.userId) {
            throw new common_1.ForbiddenException('You do not have permission');
        }
        const isAdmin = user.role === 'ADMIN';
        return this.pluginsService.toggleVisibility(id, isPublic, isAdmin, mode);
    }
    async delete(req, id) {
        const user = req.user;
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can delete plugins');
        }
        return this.pluginsService.delete(id);
    }
    findAllForAdmin(req) {
        const user = req.user;
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can view all plugins');
        }
        return this.pluginsService.findAllForAdmin();
    }
};
exports.PluginsController = PluginsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "findPending", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "findMyPlugins", null);
__decorate([
    (0, common_1.Get)(':id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PluginsController.prototype, "findReviews", null);
__decorate([
    (0, common_1.Post)(':id/reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('rating')),
    __param(3, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "upsertReview", null);
__decorate([
    (0, common_1.Patch)(':id/reviews/:reviewId/reply'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('reviewId')),
    __param(3, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "replyReview", null);
__decorate([
    (0, common_1.Delete)(':id/reviews/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Get)(':id/versions/actions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "findVersionActions", null);
__decorate([
    (0, common_1.Get)(':id/versions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "findVersions", null);
__decorate([
    (0, common_1.Patch)(':id/versions/:version/rollback'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('version')),
    __param(3, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "rollbackVersion", null);
__decorate([
    (0, common_1.Delete)(':id/versions/:version'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('version')),
    __param(3, (0, common_1.Query)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "deleteVersion", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('allStatus')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/download'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PluginsController.prototype, "recordDownload", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/versions/:version/audit'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('version')),
    __param(3, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "audit", null);
__decorate([
    (0, common_1.Patch)(':id/visibility'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('isPublic')),
    __param(3, (0, common_1.Body)('mode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean, String]),
    __metadata("design:returntype", Promise)
], PluginsController.prototype, "toggleVisibility", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PluginsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PluginsController.prototype, "findAllForAdmin", null);
exports.PluginsController = PluginsController = __decorate([
    (0, common_1.Controller)('plugins'),
    __metadata("design:paramtypes", [plugins_service_1.PluginsService])
], PluginsController);
//# sourceMappingURL=plugins.controller.js.map