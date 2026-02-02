import { PrismaService } from '../prisma/prisma.service';
import { PluginStatus } from '../generated/client/client';
export interface CreatePluginDto {
    id: string;
    name: string;
    description: string;
    icon: string;
    version: string;
    content: Record<string, any>;
    changelog?: string;
}
export declare class PluginsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(status?: PluginStatus): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            status: PluginStatus;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    })[]>;
    findAllPending(): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            status: PluginStatus;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    })[]>;
    findByAuthor(authorId: string): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            status: PluginStatus;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            status: PluginStatus;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    }) | null>;
    findOneAnyStatus(id: string): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            status: PluginStatus;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    }) | null>;
    create(userId: string, data: CreatePluginDto): Promise<{
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    } | {
        id: string;
        createdAt: Date;
        pluginId: string;
        version: string;
        content: import("@prisma/client/runtime/client").JsonValue;
        changelog: string | null;
        status: PluginStatus;
        auditLog: string | null;
        auditorId: string | null;
    }>;
    audit(pluginId: string, version: string, status: PluginStatus, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        pluginId: string;
        version: string;
        content: import("@prisma/client/runtime/client").JsonValue;
        changelog: string | null;
        status: PluginStatus;
        auditLog: string | null;
        auditorId: string | null;
    }>;
    findAllForAdmin(): Promise<({
        author: {
            username: string;
            avatar: string | null;
        };
        versions: {
            id: string;
            createdAt: Date;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            status: PluginStatus;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    })[]>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    }>;
    toggleVisibility(id: string, isPublic: boolean, isAdmin: boolean): Promise<{
        id: string;
        createdAt: Date;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        updatedAt: Date;
    }>;
    recordDownload(pluginId: string, ip: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
}
