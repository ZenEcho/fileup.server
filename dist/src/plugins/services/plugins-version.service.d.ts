import { PluginStatus, PluginVersionActionType } from '../../prisma/prisma-client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PluginsVersionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
            action: PluginVersionActionType;
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
    private resolveEffectiveActiveVersion;
    private ensureVersionManagePermission;
    private normalizeOptionalText;
    private extractPluginSummaryFromContent;
}
