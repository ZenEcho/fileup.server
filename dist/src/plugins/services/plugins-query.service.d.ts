import { PluginStatus } from '../../prisma/prisma-client';
import { PrismaService } from '../../prisma/prisma.service';
import { PluginVersionBase } from '../types/plugin-version-base.type';
export declare class PluginsQueryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(status?: PluginStatus): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            status: PluginStatus;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
            deletedAt: Date | null;
            deletedById: string | null;
            deleteReason: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        activeVersionId: string | null;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        lastVersionActionAt: Date | null;
    })[] | {
        versions: PluginVersionBase[];
        author: {
            username: string;
            avatar: string | null;
        };
        activeVersion: {
            id: string;
            status: PluginStatus;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
            deletedAt: Date | null;
            deletedById: string | null;
            deleteReason: string | null;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        activeVersionId: string | null;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        lastVersionActionAt: Date | null;
    }[]>;
    findAllPending(): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            status: PluginStatus;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
            deletedAt: Date | null;
            deletedById: string | null;
            deleteReason: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        activeVersionId: string | null;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        lastVersionActionAt: Date | null;
    })[]>;
    findByAuthor(authorId: string): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            status: PluginStatus;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
            deletedAt: Date | null;
            deletedById: string | null;
            deleteReason: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        activeVersionId: string | null;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        lastVersionActionAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        versions: PluginVersionBase[];
        author: {
            username: string;
            avatar: string | null;
        };
        activeVersion: {
            id: string;
            status: PluginStatus;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
            deletedAt: Date | null;
            deletedById: string | null;
            deleteReason: string | null;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        activeVersionId: string | null;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        lastVersionActionAt: Date | null;
    } | null>;
    findOneAnyStatus(id: string): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            status: PluginStatus;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
            deletedAt: Date | null;
            deletedById: string | null;
            deleteReason: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        activeVersionId: string | null;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        lastVersionActionAt: Date | null;
    }) | null>;
    findAllForAdmin(): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            status: PluginStatus;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
            deletedAt: Date | null;
            deletedById: string | null;
            deleteReason: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        activeVersionId: string | null;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        lastVersionActionAt: Date | null;
    })[]>;
    private pickApprovedDisplayVersion;
}
