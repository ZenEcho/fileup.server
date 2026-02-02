import { PluginsService, CreatePluginDto } from './plugins.service';
import { PluginStatus } from '../generated/client/client';
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
    findPending(req: any): Promise<({
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
    findMyPlugins(req: any): Promise<({
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
    findOne(id: string, allStatus?: string): Promise<({
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
    recordDownload(req: any, id: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    create(req: any, createPluginDto: CreatePluginDto): Promise<{
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
    audit(req: any, id: string, version: string, status: PluginStatus): Promise<{
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
    toggleVisibility(req: any, id: string, isPublic: boolean): Promise<{
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
    delete(req: any, id: string): Promise<{
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
    findAllForAdmin(req: any): Promise<({
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
}
