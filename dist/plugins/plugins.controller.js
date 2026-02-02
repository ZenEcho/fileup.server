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
const client_1 = require("../generated/client/client");
let PluginsController = class PluginsController {
    pluginsService;
    constructor(pluginsService) {
        this.pluginsService = pluginsService;
    }
    findAll(status) {
        return this.pluginsService.findAll(status);
    }
    findPending(req) {
        if (req.user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can view pending plugins');
        }
        return this.pluginsService.findAllPending();
    }
    findMyPlugins(req) {
        return this.pluginsService.findByAuthor(req.user.userId);
    }
    findOne(id, allStatus) {
        if (allStatus === 'true') {
            return this.pluginsService.findOneAnyStatus(id);
        }
        return this.pluginsService.findOne(id);
    }
    async recordDownload(req, id) {
        const ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
        const finalIp = Array.isArray(ip) ? ip[0] : (ip?.split(',')[0] || 'unknown');
        return this.pluginsService.recordDownload(id, finalIp);
    }
    create(req, createPluginDto) {
        return this.pluginsService.create(req.user.userId, createPluginDto);
    }
    audit(req, id, version, status) {
        if (req.user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can audit plugins');
        }
        return this.pluginsService.audit(id, version, status, req.user.userId);
    }
    async toggleVisibility(req, id, isPublic) {
        const plugin = await this.pluginsService.findOne(id);
        if (!plugin)
            throw new common_1.ForbiddenException('Plugin not found');
        if (req.user.role !== 'ADMIN' && plugin.authorId !== req.user.userId) {
            throw new common_1.ForbiddenException('You do not have permission');
        }
        const isAdmin = req.user.role === 'ADMIN';
        return this.pluginsService.toggleVisibility(id, isPublic, isAdmin);
    }
    async delete(req, id) {
        if (req.user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can delete plugins');
        }
        return this.pluginsService.delete(id);
    }
    findAllForAdmin(req) {
        if (req.user.role !== 'ADMIN') {
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
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