import { randomUUID } from 'node:crypto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

interface PluginReviewRow {
  id: string;
  pluginId: string;
  userId: string;
  rating: number | bigint | string;
  content: string;
  authorReply: string | null;
  authorReplyAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  reviewerUsername: string;
  reviewerAvatar: string | null;
  legacyReplyAuthorId: string | null;
  legacyReplyAuthorUsername: string | null;
  legacyReplyAuthorAvatar: string | null;
  legacyReplyAuthorRole: string | null;
}

interface PluginReviewReplyRow {
  id: string;
  reviewId: string;
  userId: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  replyUsername: string | null;
  replyAvatar: string | null;
  replyRole: string | null;
}

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

interface PluginReviewSummaryRow {
  total: number | bigint | string;
  averageRating: number | string | null;
}

const MAX_REVIEW_LENGTH = 2000;
const MAX_REPLY_LENGTH = 2000;

@Injectable()
export class PluginsReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async findReviews(pluginId: string) {
    const plugin = await this.getReviewTargetPlugin(pluginId, true);

    const summaryRows = await this.prisma.$queryRaw<PluginReviewSummaryRow[]>`
      SELECT
        COUNT(*) AS total,
        AVG(rating) AS averageRating
      FROM \`PluginReview\`
      WHERE pluginId = ${pluginId}
    `;

    const reviewRows = await this.prisma.$queryRaw<PluginReviewRow[]>`
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

    const replyRows = await this.prisma.$queryRaw<PluginReviewReplyRow[]>`
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

    const repliesByReviewId = new Map<string, PluginReviewReplyPayload[]>();
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
      reviews: reviewRows.map((row) =>
        this.mapReviewWithReplies(
          row,
          plugin.authorId,
          repliesByReviewId.get(row.id) || [],
        ),
      ),
    };
  }

  async upsertReview(
    pluginId: string,
    userId: string,
    payload: {
      rating: number;
      content: string;
    },
  ) {
    await this.getReviewTargetPlugin(pluginId, true);

    const rating = this.validateRating(payload.rating);
    const content = this.validateText(
      payload.content,
      MAX_REVIEW_LENGTH,
      'Review content',
    );

    const existingReviewRows = await this.prisma.$queryRaw<
      Array<{ id: string }>
    >`
      SELECT id
      FROM \`PluginReview\`
      WHERE pluginId = ${pluginId} AND userId = ${userId}
      LIMIT 1
    `;

    if (existingReviewRows.length > 0) {
      throw new BadRequestException('You have already reviewed this plugin');
    }

    const reviewId = randomUUID();

    await this.prisma.$executeRaw`
      INSERT INTO \`PluginReview\` (id, pluginId, userId, rating, content, createdAt, updatedAt)
      VALUES (${reviewId}, ${pluginId}, ${userId}, ${rating}, ${content}, NOW(3), NOW(3))
    `;

    return {
      success: true,
      id: reviewId,
    };
  }

  async replyReview(
    pluginId: string,
    reviewId: string,
    userId: string,
    userRole: string,
    reply: string,
  ) {
    const plugin = await this.getReviewTargetPlugin(pluginId, false);
    if (plugin.authorId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('Only plugin author or admin can reply');
    }

    const normalizedReply = this.validateText(
      reply,
      MAX_REPLY_LENGTH,
      'Reply content',
    );

    const reviewRows = await this.prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id
      FROM \`PluginReview\`
      WHERE id = ${reviewId} AND pluginId = ${pluginId}
      LIMIT 1
    `;

    if (reviewRows.length === 0) {
      throw new NotFoundException('Review not found');
    }

    const replyId = randomUUID();

    await this.prisma.$executeRaw`
      INSERT INTO \`PluginReviewReply\` (id, reviewId, userId, content, createdAt, updatedAt)
      VALUES (${replyId}, ${reviewId}, ${userId}, ${normalizedReply}, NOW(3), NOW(3))
    `;

    return {
      success: true,
      id: replyId,
    };
  }

  async deleteReview(pluginId: string, reviewId: string) {
    await this.getReviewTargetPlugin(pluginId, false);

    const affected = await this.prisma.$executeRaw`
      DELETE FROM \`PluginReview\`
      WHERE id = ${reviewId} AND pluginId = ${pluginId}
    `;

    if (!affected) {
      throw new NotFoundException('Review not found');
    }

    return { success: true };
  }

  private mapReplyRow(
    row: PluginReviewReplyRow,
    pluginAuthorId: string,
  ): PluginReviewReplyPayload {
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

  private mapReviewWithReplies(
    row: PluginReviewRow,
    pluginAuthorId: string,
    replies: PluginReviewReplyPayload[],
  ) {
    const normalizedReplies = [...replies];

    // Keep historical single-reply data compatible with new multi-reply rendering.
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
      // Keep old field to avoid breaking existing clients.
      authorReply:
        normalizedReplies.length > 0
          ? normalizedReplies[normalizedReplies.length - 1]
          : null,
    };
  }

  private async getReviewTargetPlugin(
    pluginId: string,
    requirePublished: boolean,
  ) {
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
      throw new NotFoundException('Plugin not found');
    }

    if (
      requirePublished &&
      (!plugin.isPublic ||
        (plugin.versions as Array<{ id: string }>).length === 0)
    ) {
      throw new NotFoundException('Plugin not found');
    }

    return plugin;
  }

  private validateRating(rating: number) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new BadRequestException(
        'Rating must be an integer between 1 and 5',
      );
    }
    return rating;
  }

  private validateText(value: string, maxLength: number, label: string) {
    const normalized = value.trim();
    if (!normalized) {
      throw new BadRequestException(`${label} is required`);
    }
    if (normalized.length > maxLength) {
      throw new BadRequestException(
        `${label} must be <= ${maxLength} characters`,
      );
    }
    return normalized;
  }

  private toNumber(value: unknown): number {
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
      const decimalLike = value as {
        toNumber?: () => number;
        valueOf?: () => unknown;
        toString?: () => string;
      };

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
}
