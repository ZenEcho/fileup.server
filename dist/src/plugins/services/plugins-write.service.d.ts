import { PluginStatus } from '../../prisma/prisma-client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePluginDto } from '../dto/create-plugin.dto';
export declare class PluginsWriteService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    private extractPluginSummaryFromContent;
}
