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
const prisma_service_1 = require("../prisma/prisma.service");
let PluginsService = class PluginsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(status = 'APPROVED') {
        console.log(`Finding all plugins with status: ${status}`);
        const plugins = await this.prisma.plugin.findMany({
            where: {
                isPublic: true,
                versions: {
                    some: {
                        status: status,
                    },
                },
            },
            include: {
                versions: {
                    where: { status: status },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
                author: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        console.log(`Found ${plugins.length} plugins`);
        return plugins;
    }
    async findAllPending() {
        return this.prisma.plugin.findMany({
            where: {
                versions: {
                    some: {
                        status: 'PENDING',
                    },
                },
            },
            include: {
                versions: {
                    where: { status: 'PENDING' },
                    orderBy: { createdAt: 'desc' },
                },
                author: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }
    async findByAuthor(authorId) {
        return this.prisma.plugin.findMany({
            where: {
                authorId: authorId,
            },
            include: {
                versions: {
                    orderBy: { createdAt: 'desc' },
                },
                author: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        return this.prisma.plugin.findUnique({
            where: { id },
            include: {
                versions: {
                    where: { status: 'APPROVED' },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
                author: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }
    async findOneAnyStatus(id) {
        return this.prisma.plugin.findUnique({
            where: { id },
            include: {
                versions: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
                author: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }
    async create(userId, data) {
        const existingPlugin = await this.prisma.plugin.findUnique({
            where: { id: data.id },
        });
        if (existingPlugin) {
            if (existingPlugin.authorId !== userId) {
                throw new common_1.ForbiddenException('You are not the author of this plugin');
            }
            const existingVersion = await this.prisma.pluginVersion.findUnique({
                where: {
                    pluginId_version: {
                        pluginId: data.id,
                        version: data.version,
                    },
                },
            });
            if (existingVersion) {
                throw new common_1.BadRequestException('Version already exists');
            }
            const content = {
                ...data.content,
                id: data.id,
                name: data.name,
                version: data.version,
                description: data.description,
                icon: data.icon,
            };
            return this.prisma.pluginVersion.create({
                data: {
                    pluginId: data.id,
                    version: data.version,
                    content: content,
                    changelog: data.changelog,
                    status: 'PENDING',
                },
            });
        }
        else {
            const content = {
                ...data.content,
                id: data.id,
                name: data.name,
                version: data.version,
                description: data.description,
                icon: data.icon,
            };
            return this.prisma.plugin.create({
                data: {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    icon: data.icon,
                    authorId: userId,
                    versions: {
                        create: {
                            version: data.version,
                            content: content,
                            changelog: data.changelog,
                            status: 'PENDING',
                        },
                    },
                },
            });
        }
    }
    async audit(pluginId, version, status, adminId) {
        const result = await this.prisma.pluginVersion.update({
            where: {
                pluginId_version: {
                    pluginId: pluginId,
                    version: version,
                },
            },
            data: {
                status,
                auditorId: adminId,
                auditLog: `Status updated to ${status} by admin`,
            },
        });
        if (status === 'APPROVED') {
            const content = result.content;
            await this.prisma.plugin.update({
                where: { id: pluginId },
                data: {
                    name: content.name,
                    description: content.description,
                    icon: content.icon,
                },
            });
        }
        return result;
    }
    async findAllForAdmin() {
        return this.prisma.plugin.findMany({
            include: {
                versions: {
                    orderBy: { createdAt: 'desc' },
                },
                author: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }
    async delete(id) {
        return this.prisma.plugin.delete({
            where: { id },
        });
    }
    async toggleVisibility(id, isPublic, isAdmin) {
        const data = { isPublic };
        if (isAdmin && !isPublic) {
            data.adminDisabled = true;
        }
        else if (isAdmin && isPublic) {
            data.adminDisabled = false;
        }
        else if (!isAdmin && isPublic) {
            const plugin = await this.prisma.plugin.findUnique({ where: { id } });
            if (plugin?.adminDisabled) {
                throw new common_1.ForbiddenException('Plugin has been disabled by admin');
            }
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
};
exports.PluginsService = PluginsService;
exports.PluginsService = PluginsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PluginsService);
//# sourceMappingURL=plugins.service.js.map