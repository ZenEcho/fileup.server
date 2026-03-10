import { PluginStatus } from '../../prisma/prisma-client';
export interface PluginVersionBase {
    id: string;
    version: string;
    status: PluginStatus;
    deletedAt: Date | null;
    changelog?: string | null;
    createdAt?: Date | string;
    content?: any;
}
