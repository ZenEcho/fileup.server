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
exports.PluginsWriteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const plugin_payload_1 = require("../plugin-payload");
let PluginsWriteService = class PluginsWriteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        const normalized = (0, plugin_payload_1.normalizeCreatePluginPayload)(data);
        const existingPlugin = await this.prisma.plugin.findUnique({
            where: { id: normalized.id },
        });
        if (existingPlugin) {
            if (existingPlugin.authorId !== userId) {
                throw new common_1.ForbiddenException('You are not the author of this plugin');
            }
            const existingVersion = await this.prisma.pluginVersion.findUnique({
                where: {
                    pluginId_version: {
                        pluginId: normalized.id,
                        version: normalized.version,
                    },
                },
                select: {
                    id: true,
                    status: true,
                },
            });
            if (existingVersion) {
                if (existingVersion.status === 'REJECTED') {
                    throw new common_1.BadRequestException({
                        code: 'PLUGIN_VERSION_REJECTED_RESUBMIT_REQUIRES_NEW_VERSION',
                        message: 'Rejected version cannot be resubmitted with the same version number. Please bump the version before submitting again.',
                    });
                }
                throw new common_1.BadRequestException({
                    code: 'PLUGIN_VERSION_ALREADY_EXISTS',
                    message: 'Version already exists. Please use a new version number before submitting.',
                });
            }
            return this.prisma.pluginVersion.create({
                data: {
                    pluginId: normalized.id,
                    version: normalized.version,
                    content: normalized.content,
                    changelog: data.changelog,
                    status: 'PENDING',
                },
            });
        }
        return this.prisma.plugin.create({
            data: {
                id: normalized.id,
                name: normalized.name,
                description: normalized.description,
                icon: normalized.icon,
                authorId: userId,
                versions: {
                    create: {
                        version: normalized.version,
                        content: normalized.content,
                        changelog: data.changelog,
                        status: 'PENDING',
                    },
                },
            },
        });
    }
    async audit(pluginId, version, status, adminId) {
        const existingVersion = await this.prisma.pluginVersion.findUnique({
            where: {
                pluginId_version: {
                    pluginId,
                    version,
                },
            },
            select: {
                id: true,
                deletedAt: true,
            },
        });
        if (!existingVersion) {
            throw new common_1.NotFoundException('Version not found');
        }
        if (existingVersion.deletedAt) {
            throw new common_1.BadRequestException({
                code: 'PLUGIN_VERSION_AUDIT_DELETED_FORBIDDEN',
                message: 'Deleted version cannot be audited',
            });
        }
        const result = await this.prisma.pluginVersion.update({
            where: {
                pluginId_version: {
                    pluginId,
                    version,
                },
            },
            data: {
                status,
                auditorId: adminId,
                auditLog: `Status updated to ${status} by admin`,
            },
        });
        if (status === 'APPROVED') {
            const metadata = this.extractPluginSummaryFromContent(result.content);
            await this.prisma.plugin.update({
                where: { id: pluginId },
                data: {
                    ...metadata,
                    activeVersionId: result.id,
                },
            });
        }
        return result;
    }
    async delete(id) {
        return this.prisma.plugin.delete({
            where: { id },
        });
    }
    async toggleVisibility(id, isPublic, isAdmin, mode = 'NORMAL') {
        const plugin = await this.prisma.plugin.findUnique({ where: { id } });
        if (!plugin) {
            throw new common_1.NotFoundException('Plugin not found');
        }
        const data = { isPublic };
        if (isAdmin) {
            if (mode === 'FORCE') {
                data.adminDisabled = !isPublic;
            }
            else if (plugin.adminDisabled && isPublic) {
                throw new common_1.ConflictException({
                    code: 'PLUGIN_VISIBILITY_ADMIN_DISABLED',
                    message: 'Plugin is force-disabled by admin. Use force republish to re-enable.',
                });
            }
        }
        else if (isPublic && plugin.adminDisabled) {
            throw new common_1.ForbiddenException('Plugin has been disabled by admin');
        }
        return this.prisma.plugin.update({
            where: { id },
            data,
        });
    }
    async recordDownload(pluginId, ip) {
        const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
        const recentDownload = await this.prisma.pluginDownload.findFirst({
            where: {
                pluginId,
                ip,
                createdAt: {
                    gte: tenSecondsAgo,
                },
            },
        });
        if (recentDownload) {
            return { success: false, message: 'Downloaded recently' };
        }
        await this.prisma.pluginDownload.create({
            data: {
                pluginId,
                ip,
            },
        });
        await this.prisma.plugin.update({
            where: { id: pluginId },
            data: {
                downloads: {
                    increment: 1,
                },
            },
        });
        return { success: true };
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
exports.PluginsWriteService = PluginsWriteService;
exports.PluginsWriteService = PluginsWriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PluginsWriteService);
//# sourceMappingURL=plugins-write.service.js.map