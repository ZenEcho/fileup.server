import { PluginStatus } from '../prisma/prisma-client';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { PluginsQueryService } from './services/plugins-query.service';
import { PluginsReviewService } from './services/plugins-review.service';
import { PluginsVersionService } from './services/plugins-version.service';
import { PluginsWriteService } from './services/plugins-write.service';
export declare class PluginsService {
    private readonly queryService;
    private readonly writeService;
    private readonly versionService;
    private readonly reviewService;
    constructor(queryService: PluginsQueryService, writeService: PluginsWriteService, versionService: PluginsVersionService, reviewService: PluginsReviewService);
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
    findVersions(pluginId: string, userId: string, userRole: string, includeDeleted: boolean): Promise<{
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
    rollbackVersion(pluginId: string, version: string, userId: string, userRole: string, reason?: string): Promise<{
        success: boolean;
        pluginId: string;
        fromVersion: string;
        toVersion: string;
        activeVersion: string;
    }>;
    deleteVersion(pluginId: string, version: string, userId: string, userRole: string, reason?: string): Promise<{
        success: boolean;
        pluginId: string;
        deletedVersion: string;
    }>;
    findVersionActions(pluginId: string, userId: string, userRole: string): Promise<{
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
    create(userId: string, data: CreatePluginDto): Promise<{
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
    audit(pluginId: string, version: string, status: PluginStatus, adminId: string): Promise<{
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
    delete(id: string): Promise<{
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
    toggleVisibility(id: string, isPublic: boolean, isAdmin: boolean, mode?: 'FORCE' | 'NORMAL'): Promise<{
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
    recordDownload(pluginId: string, ip: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    findReviews(pluginId: string): Promise<any>;
    upsertReview(pluginId: string, userId: string, payload: {
        rating: number;
        content: string;
    }): Promise<{
        success: boolean;
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    replyReview(pluginId: string, reviewId: string, userId: string, userRole: string, reply: string): Promise<{
        success: boolean;
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    deleteReview(pluginId: string, reviewId: string): Promise<{
        success: boolean;
    }>;
}
