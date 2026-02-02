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
            status: PluginStatus;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
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
            status: PluginStatus;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
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
            status: PluginStatus;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
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
            status: PluginStatus;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
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
            status: PluginStatus;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    create(userId: string, data: CreatePluginDto): Promise<{
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | {
        id: string;
        createdAt: Date;
        status: PluginStatus;
        pluginId: string;
        version: string;
        content: import("@prisma/client/runtime/client").JsonValue;
        changelog: string | null;
        auditLog: string | null;
        auditorId: string | null;
    }>;
    audit(pluginId: string, version: string, status: PluginStatus, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        status: PluginStatus;
        pluginId: string;
        version: string;
        content: import("@prisma/client/runtime/client").JsonValue;
        changelog: string | null;
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
            status: PluginStatus;
            pluginId: string;
            version: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            changelog: string | null;
            auditLog: string | null;
            auditorId: string | null;
        }[];
    } & {
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    delete(id: string): Promise<{
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    toggleVisibility(id: string, isPublic: boolean, isAdmin: boolean): Promise<{
        name: string;
        description: string;
        icon: string;
        id: string;
        authorId: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
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
