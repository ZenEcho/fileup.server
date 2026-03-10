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
exports.PluginsQueryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PluginsQueryService = class PluginsQueryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(status = 'APPROVED') {
        if (status !== 'APPROVED') {
            return this.prisma.plugin.findMany({
                where: {
                    isPublic: true,
                    versions: {
                        some: {
                            status,
                            deletedAt: null,
                        },
                    },
                },
                include: {
                    versions: {
                        where: { status, deletedAt: null },
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
        const plugins = await this.prisma.plugin.findMany({
            where: {
                isPublic: true,
                OR: [
                    {
                        activeVersion: {
                            is: {
                                status: 'APPROVED',
                                deletedAt: null,
                            },
                        },
                    },
                    {
                        activeVersionId: null,
                        versions: {
                            some: {
                                status: 'APPROVED',
                                deletedAt: null,
                            },
                        },
                    },
                ],
            },
            include: {
                activeVersion: true,
                versions: {
                    where: { status: 'APPROVED', deletedAt: null },
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
        return plugins.map((plugin) => ({
            ...plugin,
            versions: this.pickApprovedDisplayVersion(plugin.activeVersion, plugin.versions),
        }));
    }
    async findAllPending() {
        return this.prisma.plugin.findMany({
            where: {
                versions: {
                    some: {
                        status: 'PENDING',
                        deletedAt: null,
                    },
                },
            },
            include: {
                versions: {
                    where: { status: 'PENDING', deletedAt: null },
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
                authorId,
            },
            include: {
                versions: {
                    where: { deletedAt: null },
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
        const plugin = await this.prisma.plugin.findUnique({
            where: { id },
            include: {
                activeVersion: true,
                versions: {
                    where: { status: 'APPROVED', deletedAt: null },
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
        if (!plugin) {
            return null;
        }
        return {
            ...plugin,
            versions: this.pickApprovedDisplayVersion(plugin.activeVersion, plugin.versions),
        };
    }
    async findOneAnyStatus(id) {
        return this.prisma.plugin.findUnique({
            where: { id },
            include: {
                versions: {
                    where: { deletedAt: null },
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
    async findAllForAdmin() {
        return this.prisma.plugin.findMany({
            include: {
                versions: {
                    where: {
                        deletedAt: null,
                    },
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
    pickApprovedDisplayVersion(activeVersion, approvedVersions) {
        if (activeVersion &&
            activeVersion.status === 'APPROVED' &&
            activeVersion.deletedAt === null) {
            return [activeVersion];
        }
        return approvedVersions.length > 0 ? [approvedVersions[0]] : [];
    }
};
exports.PluginsQueryService = PluginsQueryService;
exports.PluginsQueryService = PluginsQueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PluginsQueryService);
//# sourceMappingURL=plugins-query.service.js.map