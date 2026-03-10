"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginsReviewService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const MAX_REVIEW_LENGTH = 2000;
const MAX_REPLY_LENGTH = 2000;
let PluginsReviewService = class PluginsReviewService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findReviews(pluginId) {
        const plugin = await this.getReviewTargetPlugin(pluginId, true);
        const summaryRows = await this.prisma.$queryRaw `
      SELECT
        COUNT(*) AS total,
        AVG(rating) AS averageRating
      FROM \`PluginReview\`
      WHERE pluginId = ${pluginId}
    `;
        const reviewRows = await this.prisma.$queryRaw `
      SELECT
        r.id,
        r.pluginId,
        r.userId,
        r.rating,
        r.content,
        r.authorReply,
        r.authorReplyAt,
        r.createdAt,
        r.updatedAt,
        reviewer.username AS reviewerUsername,
        reviewer.avatar AS reviewerAvatar,
        legacyReplyAuthor.id AS legacyReplyAuthorId,
        legacyReplyAuthor.username AS legacyReplyAuthorUsername,
        legacyReplyAuthor.avatar AS legacyReplyAuthorAvatar,
        legacyReplyAuthor.role AS legacyReplyAuthorRole
      FROM \`PluginReview\` r
      INNER JOIN \`User\` reviewer ON reviewer.id = r.userId
      LEFT JOIN \`User\` legacyReplyAuthor ON legacyReplyAuthor.id = r.authorReplyById
      WHERE r.pluginId = ${pluginId}
      ORDER BY r.createdAt DESC
    `;
        const replyRows = await this.prisma.$queryRaw `
      SELECT
        rr.id,
        rr.reviewId,
        rr.userId,
        rr.content,
        rr.createdAt,
        rr.updatedAt,
        replyUser.username AS replyUsername,
        replyUser.avatar AS replyAvatar,
        replyUser.role AS replyRole
      FROM \`PluginReviewReply\` rr
      INNER JOIN \`PluginReview\` r ON r.id = rr.reviewId
      INNER JOIN \`User\` replyUser ON replyUser.id = rr.userId
      WHERE r.pluginId = ${pluginId}
      ORDER BY rr.createdAt ASC
    `;
        const repliesByReviewId = new Map();
        for (const row of replyRows) {
            const mapped = this.mapReplyRow(row, plugin.authorId);
            const list = repliesByReviewId.get(row.reviewId) || [];
            list.push(mapped);
            repliesByReviewId.set(row.reviewId, list);
        }
        const summaryRow = summaryRows[0];
        const total = this.toNumber(summaryRow?.total ?? 0);
        const averageRatingRaw = this.toNumber(summaryRow?.averageRating ?? 0);
        return {
            summary: {
                total,
                averageRating: total > 0 ? Number(averageRatingRaw.toFixed(2)) : 0,
            },
            reviews: reviewRows.map((row) => this.mapReviewWithReplies(row, plugin.authorId, repliesByReviewId.get(row.id) || [])),
        };
    }
    async upsertReview(pluginId, userId, payload) {
        await this.getReviewTargetPlugin(pluginId, true);
        const rating = this.validateRating(payload.rating);
        const content = this.validateText(payload.content, MAX_REVIEW_LENGTH, 'Review content');
        const existingReviewRows = await this.prisma.$queryRaw `
      SELECT id
      FROM \`PluginReview\`
      WHERE pluginId = ${pluginId} AND userId = ${userId}
      LIMIT 1
    `;
        if (existingReviewRows.length > 0) {
            throw new common_1.BadRequestException('You have already reviewed this plugin');
        }
        const reviewId = (0, node_crypto_1.randomUUID)();
        await this.prisma.$executeRaw `
      INSERT INTO \`PluginReview\` (id, pluginId, userId, rating, content, createdAt, updatedAt)
      VALUES (${reviewId}, ${pluginId}, ${userId}, ${rating}, ${content}, NOW(3), NOW(3))
    `;
        return {
            success: true,
            id: reviewId,
        };
    }
    async replyReview(pluginId, reviewId, userId, userRole, reply) {
        const plugin = await this.getReviewTargetPlugin(pluginId, false);
        if (plugin.authorId !== userId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only plugin author or admin can reply');
        }
        const normalizedReply = this.validateText(reply, MAX_REPLY_LENGTH, 'Reply content');
        const reviewRows = await this.prisma.$queryRaw `
      SELECT id
      FROM \`PluginReview\`
      WHERE id = ${reviewId} AND pluginId = ${pluginId}
      LIMIT 1
    `;
        if (reviewRows.length === 0) {
            throw new common_1.NotFoundException('Review not found');
        }
        const replyId = (0, node_crypto_1.randomUUID)();
        await this.prisma.$executeRaw `
      INSERT INTO \`PluginReviewReply\` (id, reviewId, userId, content, createdAt, updatedAt)
      VALUES (${replyId}, ${reviewId}, ${userId}, ${normalizedReply}, NOW(3), NOW(3))
    `;
        return {
            success: true,
            id: replyId,
        };
    }
    async deleteReview(pluginId, reviewId) {
        await this.getReviewTargetPlugin(pluginId, false);
        const affected = await this.prisma.$executeRaw `
      DELETE FROM \`PluginReview\`
      WHERE id = ${reviewId} AND pluginId = ${pluginId}
    `;
        if (!affected) {
            throw new common_1.NotFoundException('Review not found');
        }
        return { success: true };
    }
    mapReplyRow(row, pluginAuthorId) {
        return {
            id: row.id,
            content: row.content,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            author: {
                userId: row.userId,
                username: row.replyUsername,
                avatar: row.replyAvatar,
                isAuthor: row.userId === pluginAuthorId,
                isAdmin: row.replyRole === 'ADMIN',
            },
        };
    }
    mapReviewWithReplies(row, pluginAuthorId, replies) {
        const normalizedReplies = [...replies];
        if (row.authorReply) {
            normalizedReplies.unshift({
                id: `legacy-${row.id}`,
                content: row.authorReply,
                createdAt: row.authorReplyAt || row.updatedAt,
                updatedAt: row.updatedAt,
                author: {
                    userId: row.legacyReplyAuthorId,
                    username: row.legacyReplyAuthorUsername,
                    avatar: row.legacyReplyAuthorAvatar,
                    isAuthor: row.legacyReplyAuthorId === pluginAuthorId,
                    isAdmin: row.legacyReplyAuthorRole === 'ADMIN',
                },
            });
        }
        return {
            id: row.id,
            pluginId: row.pluginId,
            rating: this.toNumber(row.rating),
            content: row.content,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            reviewer: {
                userId: row.userId,
                username: row.reviewerUsername,
                avatar: row.reviewerAvatar,
                isAuthor: row.userId === pluginAuthorId,
                isAdmin: false,
            },
            replies: normalizedReplies,
            authorReply: normalizedReplies.length > 0
                ? normalizedReplies[normalizedReplies.length - 1]
                : null,
        };
    }
    async getReviewTargetPlugin(pluginId, requirePublished) {
        const plugin = await this.prisma.plugin.findUnique({
            where: { id: pluginId },
            select: {
                id: true,
                authorId: true,
                isPublic: true,
                versions: {
                    where: { status: 'APPROVED', deletedAt: null },
                    select: { id: true },
                    take: 1,
                },
            },
        });
        if (!plugin) {
            throw new common_1.NotFoundException('Plugin not found');
        }
        if (requirePublished &&
            (!plugin.isPublic ||
                plugin.versions.length === 0)) {
            throw new common_1.NotFoundException('Plugin not found');
        }
        return plugin;
    }
    validateRating(rating) {
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            throw new common_1.BadRequestException('Rating must be an integer between 1 and 5');
        }
        return rating;
    }
    validateText(value, maxLength, label) {
        const normalized = value.trim();
        if (!normalized) {
            throw new common_1.BadRequestException(`${label} is required`);
        }
        if (normalized.length > maxLength) {
            throw new common_1.BadRequestException(`${label} must be <= ${maxLength} characters`);
        }
        return normalized;
    }
    toNumber(value) {
        if (value == null) {
            return 0;
        }
        if (typeof value === 'bigint') {
            return Number(value);
        }
        if (typeof value === 'number') {
            return Number.isFinite(value) ? value : 0;
        }
        if (typeof value === 'string') {
            const n = Number(value);
            return Number.isFinite(n) ? n : 0;
        }
        if (typeof value === 'object') {
            const decimalLike = value;
            if (typeof decimalLike.toNumber === 'function') {
                const n = decimalLike.toNumber();
                return Number.isFinite(n) ? n : 0;
            }
            if (typeof decimalLike.valueOf === 'function') {
                const raw = decimalLike.valueOf();
                if (raw !== value) {
                    return this.toNumber(raw);
                }
            }
            if (typeof decimalLike.toString === 'function') {
                const n = Number(decimalLike.toString());
                return Number.isFinite(n) ? n : 0;
            }
        }
        return 0;
    }
};
exports.PluginsReviewService = PluginsReviewService;
exports.PluginsReviewService = PluginsReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PluginsReviewService);
//# sourceMappingURL=plugins-review.service.js.map