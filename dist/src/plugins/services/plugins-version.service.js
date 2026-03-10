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
exports.PluginsVersionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../../prisma/prisma-client");
const prisma_service_1 = require("../../prisma/prisma.service");
let PluginsVersionService = class PluginsVersionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findVersions(pluginId, userId, userRole, includeDeleted) {
        const plugin = await this.prisma.plugin.findUnique({
            where: { id: pluginId },
            select: {
                id: true,
                authorId: true,
                activeVersionId: true,
                activeVersion: {
                    select: {
                        id: true,
                        version: true,
                        status: true,
                        deletedAt: true,
                    },
                },
                versions: {
                    where: includeDeleted ? {} : { deletedAt: null },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        version: true,
                        status: true,
                        changelog: true,
                        createdAt: true,
                        deletedAt: true,
                    },
                },
            },
        });
        if (!plugin) {
            throw new common_1.NotFoundException({
                code: 'PLUGIN_NOT_FOUND',
                message: 'Plugin not found',
            });
        }
        this.ensureVersionManagePermission(plugin.authorId, userId, userRole);
        const approvedAvailable = plugin.versions.filter((item) => item.status === 'APPROVED' && item.deletedAt === null);
        const effectiveActive = this.resolveEffectiveActiveVersion(plugin.activeVersionId, plugin.activeVersion, approvedAvailable);
        if (effectiveActive && plugin.activeVersionId !== effectiveActive.id) {
            await this.prisma.plugin.update({
                where: { id: pluginId },
                data: { activeVersionId: effectiveActive.id },
            });
        }
        return {
            pluginId,
            activeVersion: effectiveActive?.version ?? null,
            versions: plugin.versions.map((item) => ({
                id: item.id,
                version: item.version,
                status: item.status,
                isActive: effectiveActive ? effectiveActive.id === item.id : false,
                changelog: item.changelog,
                createdAt: item.createdAt,
                deletedAt: item.deletedAt,
            })),
        };
    }
    async rollbackVersion(pluginId, version, userId, userRole, reason) {
        const normalizedReason = this.normalizeOptionalText(reason);
        return this.prisma.$transaction(async (tx) => {
            const plugin = await tx.plugin.findUnique({
                where: { id: pluginId },
                select: {
                    id: true,
                    authorId: true,
                    activeVersionId: true,
                    activeVersion: {
                        select: {
                            id: true,
                            version: true,
                            status: true,
                            deletedAt: true,
                        },
                    },
                    versions: {
                        where: {
                            status: 'APPROVED',
                            deletedAt: null,
                        },
                        orderBy: { createdAt: 'desc' },
                        select: {
                            id: true,
                            version: true,
                            status: true,
                            deletedAt: true,
                            content: true,
                        },
                    },
                },
            });
            if (!plugin) {
                throw new common_1.NotFoundException({
                    code: 'PLUGIN_NOT_FOUND',
                    message: 'Plugin not found',
                });
            }
            this.ensureVersionManagePermission(plugin.authorId, userId, userRole);
            const targetVersion = plugin.versions.find((item) => item.version === version);
            if (!targetVersion) {
                throw new common_1.BadRequestException({
                    code: 'PLUGIN_VERSION_ROLLBACK_INVALID_TARGET',
                    message: 'Rollback target must be an approved and non-deleted version',
                });
            }
            const currentActive = this.resolveEffectiveActiveVersion(plugin.activeVersionId, plugin.activeVersion, plugin.versions);
            if (!currentActive) {
                throw new common_1.ConflictException({
                    code: 'PLUGIN_VERSION_NO_APPROVED_ACTIVE',
                    message: 'No approved active version is available',
                });
            }
            if (currentActive.version === targetVersion.version) {
                throw new common_1.ConflictException({
                    code: 'PLUGIN_VERSION_ALREADY_ACTIVE',
                    message: 'Target version is already active',
                });
            }
            const metadata = this.extractPluginSummaryFromContent(targetVersion.content);
            await tx.plugin.update({
                where: { id: pluginId },
                data: {
                    activeVersionId: targetVersion.id,
                    lastVersionActionAt: new Date(),
                    ...metadata,
                },
            });
            await tx.pluginVersionActionLog.create({
                data: {
                    pluginId,
                    operatorId: userId,
                    action: prisma_client_1.PluginVersionActionType.ROLLBACK,
                    fromVersion: currentActive.version,
                    toVersion: targetVersion.version,
                    reason: normalizedReason,
                },
            });
            return {
                success: true,
                pluginId,
                fromVersion: currentActive.version,
                toVersion: targetVersion.version,
                activeVersion: targetVersion.version,
            };
        });
    }
    async deleteVersion(pluginId, version, userId, userRole, reason) {
        const normalizedReason = this.normalizeOptionalText(reason);
        return this.prisma.$transaction(async (tx) => {
            const plugin = await tx.plugin.findUnique({
                where: { id: pluginId },
                select: {
                    id: true,
                    authorId: true,
                    activeVersionId: true,
                    activeVersion: {
                        select: {
                            id: true,
                            version: true,
                            status: true,
                            deletedAt: true,
                        },
                    },
                    versions: {
                        orderBy: { createdAt: 'desc' },
                        select: {
                            id: true,
                            version: true,
                            status: true,
                            deletedAt: true,
                        },
                    },
                },
            });
            if (!plugin) {
                throw new common_1.NotFoundException({
                    code: 'PLUGIN_NOT_FOUND',
                    message: 'Plugin not found',
                });
            }
            this.ensureVersionManagePermission(plugin.authorId, userId, userRole);
            const targetVersion = plugin.versions.find((item) => item.version === version && item.deletedAt === null);
            if (!targetVersion) {
                throw new common_1.NotFoundException({
                    code: 'PLUGIN_VERSION_NOT_FOUND',
                    message: 'Version not found',
                });
            }
            const approvedAvailable = plugin.versions.filter((item) => item.status === 'APPROVED' && item.deletedAt === null);
            const currentActive = this.resolveEffectiveActiveVersion(plugin.activeVersionId, plugin.activeVersion, approvedAvailable);
            if (currentActive && currentActive.id === targetVersion.id) {
                throw new common_1.ConflictException({
                    code: 'PLUGIN_VERSION_DELETE_ACTIVE_FORBIDDEN',
                    message: 'Active version cannot be deleted',
                });
            }
            if (targetVersion.status === 'APPROVED' &&
                approvedAvailable.length <= 1) {
                throw new common_1.ConflictException({
                    code: 'PLUGIN_VERSION_DELETE_LAST_APPROVED_FORBIDDEN',
                    message: 'At least one approved version must be retained',
                });
            }
            await tx.pluginVersion.update({
                where: {
                    pluginId_version: {
                        pluginId,
                        version,
                    },
                },
                data: {
                    deletedAt: new Date(),
                    deletedById: userId,
                    deleteReason: normalizedReason,
                },
            });
            await tx.plugin.update({
                where: { id: pluginId },
                data: {
                    lastVersionActionAt: new Date(),
                },
            });
            await tx.pluginVersionActionLog.create({
                data: {
                    pluginId,
                    operatorId: userId,
                    action: prisma_client_1.PluginVersionActionType.DELETE,
                    targetVersion: targetVersion.version,
                    reason: normalizedReason,
                },
            });
            return {
                success: true,
                pluginId,
                deletedVersion: targetVersion.version,
            };
        });
    }
    async findVersionActions(pluginId, userId, userRole) {
        const plugin = await this.prisma.plugin.findUnique({
            where: { id: pluginId },
            select: {
                id: true,
                authorId: true,
            },
        });
        if (!plugin) {
            throw new common_1.NotFoundException({
                code: 'PLUGIN_NOT_FOUND',
                message: 'Plugin not found',
            });
        }
        this.ensureVersionManagePermission(plugin.authorId, userId, userRole);
        const logs = (await this.prisma.pluginVersionActionLog.findMany({
            where: { pluginId },
            include: {
                operator: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 100,
        }));
        return {
            pluginId,
            actions: logs.map((item) => ({
                id: item.id,
                action: item.action,
                fromVersion: item.fromVersion,
                toVersion: item.toVersion,
                targetVersion: item.targetVersion,
                reason: item.reason,
                createdAt: item.createdAt,
                operator: {
                    id: item.operator.id,
                    username: item.operator.username,
                    avatar: item.operator.avatar,
                },
            })),
        };
    }
    resolveEffectiveActiveVersion(activeVersionId, activeVersion, approvedVersions) {
        if (activeVersion &&
            activeVersionId === activeVersion.id &&
            activeVersion.status === 'APPROVED' &&
            activeVersion.deletedAt === null) {
            return activeVersion;
        }
        return approvedVersions.length > 0 ? approvedVersions[0] : null;
    }
    ensureVersionManagePermission(authorId, userId, userRole) {
        if (userRole !== 'ADMIN' && authorId !== userId) {
            throw new common_1.ForbiddenException({
                code: 'PLUGIN_VERSION_FORBIDDEN',
                message: 'You do not have permission to manage this plugin version',
            });
        }
    }
    normalizeOptionalText(value) {
        if (typeof value !== 'string') {
            return null;
        }
        const normalized = value.trim();
        return normalized.length > 0 ? normalized : null;
    }
    extractPluginSummaryFromContent(content) {
        if (!content || typeof content !== 'object' || Array.isArray(content)) {
            return {};
        }
        const data = content;
        const summary = {};
        if (typeof data.name === 'string' && data.name.trim()) {
            summary.name = data.name.trim();
        }
        if (typeof data.description === 'string') {
            summary.description = data.description.trim();
        }
        if (typeof data.icon === 'string' && data.icon.trim()) {
            summary.icon = data.icon.trim();
        }
        return summary;
    }
};
exports.PluginsVersionService = PluginsVersionService;
exports.PluginsVersionService = PluginsVersionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PluginsVersionService);
//# sourceMappingURL=plugins-version.service.js.map