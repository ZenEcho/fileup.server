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
exports.PluginsService = void 0;
const common_1 = require("@nestjs/common");
const plugins_query_service_1 = require("./services/plugins-query.service");
const plugins_review_service_1 = require("./services/plugins-review.service");
const plugins_version_service_1 = require("./services/plugins-version.service");
const plugins_write_service_1 = require("./services/plugins-write.service");
let PluginsService = class PluginsService {
    queryService;
    writeService;
    versionService;
    reviewService;
    constructor(queryService, writeService, versionService, reviewService) {
        this.queryService = queryService;
        this.writeService = writeService;
        this.versionService = versionService;
        this.reviewService = reviewService;
    }
    async findAll(status = 'APPROVED') {
        return this.queryService.findAll(status);
    }
    async findAllPending() {
        return this.queryService.findAllPending();
    }
    async findByAuthor(authorId) {
        return this.queryService.findByAuthor(authorId);
    }
    async findOne(id) {
        return this.queryService.findOne(id);
    }
    async findOneAnyStatus(id) {
        return this.queryService.findOneAnyStatus(id);
    }
    async findVersions(pluginId, userId, userRole, includeDeleted) {
        return this.versionService.findVersions(pluginId, userId, userRole, includeDeleted);
    }
    async rollbackVersion(pluginId, version, userId, userRole, reason) {
        return this.versionService.rollbackVersion(pluginId, version, userId, userRole, reason);
    }
    async deleteVersion(pluginId, version, userId, userRole, reason) {
        return this.versionService.deleteVersion(pluginId, version, userId, userRole, reason);
    }
    async findVersionActions(pluginId, userId, userRole) {
        return this.versionService.findVersionActions(pluginId, userId, userRole);
    }
    async create(userId, data) {
        return this.writeService.create(userId, data);
    }
    async audit(pluginId, version, status, adminId) {
        return this.writeService.audit(pluginId, version, status, adminId);
    }
    async findAllForAdmin() {
        return this.queryService.findAllForAdmin();
    }
    async delete(id) {
        return this.writeService.delete(id);
    }
    async toggleVisibility(id, isPublic, isAdmin, mode = 'NORMAL') {
        return this.writeService.toggleVisibility(id, isPublic, isAdmin, mode);
    }
    async recordDownload(pluginId, ip) {
        return this.writeService.recordDownload(pluginId, ip);
    }
    async findReviews(pluginId) {
        return this.reviewService.findReviews(pluginId);
    }
    async upsertReview(pluginId, userId, payload) {
        return this.reviewService.upsertReview(pluginId, userId, payload);
    }
    async replyReview(pluginId, reviewId, userId, userRole, reply) {
        return this.reviewService.replyReview(pluginId, reviewId, userId, userRole, reply);
    }
    async deleteReview(pluginId, reviewId) {
        return this.reviewService.deleteReview(pluginId, reviewId);
    }
};
exports.PluginsService = PluginsService;
exports.PluginsService = PluginsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plugins_query_service_1.PluginsQueryService,
        plugins_write_service_1.PluginsWriteService,
        plugins_version_service_1.PluginsVersionService,
        plugins_review_service_1.PluginsReviewService])
], PluginsService);
//# sourceMappingURL=plugins.service.js.map