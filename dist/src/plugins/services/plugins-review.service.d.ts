import { PrismaService } from '../../prisma/prisma.service';
interface PluginReviewReplyPayload {
    id: string;
    content: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    author: {
        userId: string | null;
        username: string | null;
        avatar: string | null;
        isAuthor: boolean;
        isAdmin: boolean;
    };
}
export declare class PluginsReviewService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findReviews(pluginId: string): Promise<{
        summary: {
            total: number;
            averageRating: number;
        };
        reviews: {
            id: string;
            pluginId: string;
            rating: number;
            content: string;
            createdAt: string | Date;
            updatedAt: string | Date;
            reviewer: {
                userId: string;
                username: string;
                avatar: string | null;
                isAuthor: boolean;
                isAdmin: boolean;
            };
            replies: PluginReviewReplyPayload[];
            authorReply: PluginReviewReplyPayload | null;
        }[];
    }>;
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
    private mapReplyRow;
    private mapReviewWithReplies;
    private getReviewTargetPlugin;
    private validateRating;
    private validateText;
    private toNumber;
}
export {};
