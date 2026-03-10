import { PluginsService } from './plugins.service';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { PluginStatus } from '../prisma/prisma-client';
import { Request } from 'express';
export declare class PluginsController {
    private readonly pluginsService;
    constructor(pluginsService: PluginsService);
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
        versions: import("./types/plugin-version-base.type").PluginVersionBase[];
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
    findPending(req: Request): Promise<({
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
    findMyPlugins(req: Request): Promise<({
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
    findReviews(id: string): Promise<any>;
    upsertReview(req: Request, id: string, rating: number, content: string): Promise<{
        success: boolean;
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    replyReview(req: Request, id: string, reviewId: string, content: string): Promise<{
        success: boolean;
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    deleteReview(req: Request, id: string, reviewId: string): Promise<{
        success: boolean;
    }>;
    findVersionActions(req: Request, id: string): Promise<{
        pluginId: string;
        actions: {
            id: string;
            action: import("../prisma/prisma-client").PluginVersionActionType;
            fromVersion: string | null;
            toVersion: string | null;
            targetVersion: string | null;
            reason: string | null;
            createdAt: Date;
            operator: {
                id: string;
                username: string;
                avatar: string | null;
            };
        }[];
    }>;
    findVersions(req: Request, id: string, includeDeleted?: string): Promise<{
        pluginId: string;
        activeVersion: string | null;
        versions: {
            id: string;
            version: string;
            status: PluginStatus;
            isActive: boolean;
            changelog: string | null | undefined;
            createdAt: string | Date | undefined;
            deletedAt: Date | null;
        }[];
    }>;
    rollbackVersion(req: Request, id: string, version: string, reason?: string): Promise<{
        success: boolean;
        pluginId: string;
        fromVersion: string;
        toVersion: string;
        activeVersion: string;
    }>;
    deleteVersion(req: Request, id: string, version: string, reason?: string): Promise<{
        success: boolean;
        pluginId: string;
        deletedVersion: string;
    }>;
    findOne(id: string, allStatus?: string): Promise<{
        versions: import("./types/plugin-version-base.type").PluginVersionBase[];
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
    } | null> | Promise<({
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
    recordDownload(req: Request, id: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    create(req: Request, createPluginDto: CreatePluginDto): Promise<{
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
    } | {
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
    }>;
    audit(req: Request, id: string, version: string, status: PluginStatus): Promise<{
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
    }>;
    toggleVisibility(req: Request, id: string, isPublic: boolean, mode?: 'FORCE' | 'NORMAL'): Promise<{
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
    }>;
    delete(req: Request, id: string): Promise<{
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
    }>;
    findAllForAdmin(req: Request): Promise<({
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
}
