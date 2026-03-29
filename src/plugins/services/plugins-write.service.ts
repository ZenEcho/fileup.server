import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PluginStatus,
  PluginVersionActionType,
  Prisma,
} from '../../prisma/prisma-client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePluginDto } from '../dto/create-plugin.dto';
import { normalizeCreatePluginPayload } from '../plugin-payload';

const MAX_AUDIT_LOG_LENGTH = 500;
const MAX_VISIBILITY_REASON_LENGTH = 500;

@Injectable()
export class PluginsWriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreatePluginDto) {
    const normalized = normalizeCreatePluginPayload(data);
    const normalizedChangelog = this.normalizeOptionalText(data.changelog);

    const existingPlugin = await this.prisma.plugin.findUnique({
      where: { id: normalized.id },
    });

    if (existingPlugin) {
      if (existingPlugin.authorId !== userId) {
        throw new ForbiddenException('You are not the author of this plugin');
      }

      const existingVersion = await this.prisma.pluginVersion.findUnique({
        where: {
          pluginId_version: {
            pluginId: normalized.id,
            version: normalized.version,
          },
        },
        select: {
          id: true,
          status: true,
          deletedAt: true,
        },
      });

      if (existingVersion) {
        if (existingVersion.deletedAt) {
          throw new BadRequestException({
            code: 'PLUGIN_VERSION_DELETED_REUSE_FORBIDDEN',
            message:
              'This version number was deleted and cannot be submitted again.',
          });
        }

        if (this.isResubmittableStatus(existingVersion.status)) {
          return this.prisma.$transaction(
            async (tx: Prisma.TransactionClient) => {
              const updatedVersion = await tx.pluginVersion.update({
                where: {
                  pluginId_version: {
                    pluginId: normalized.id,
                    version: normalized.version,
                  },
                },
                data: {
                  content: normalized.content as Prisma.InputJsonValue,
                  changelog: data.changelog,
                  status: 'PENDING',
                  auditLog: null,
                  auditorId: null,
                  deletedAt: null,
                  deletedById: null,
                  deleteReason: null,
                  createdAt: new Date(),
                },
              });

              await this.createVersionActionLog(tx, {
                pluginId: normalized.id,
                operatorId: userId,
                action: PluginVersionActionType.RESUBMIT,
                targetVersion: normalized.version,
                reason:
                  normalizedChangelog ??
                  `Resubmitted from status ${existingVersion.status}`,
              });

              return updatedVersion;
            },
          );
        }

        throw new BadRequestException({
          code: 'PLUGIN_VERSION_ALREADY_EXISTS',
          message:
            'Version already exists. Please use a new version number before submitting.',
        });
      }

      return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const createdVersion = await tx.pluginVersion.create({
          data: {
            pluginId: normalized.id,
            version: normalized.version,
            content: normalized.content as Prisma.InputJsonValue,
            changelog: data.changelog,
            status: 'PENDING',
          },
        });

        await this.createVersionActionLog(tx, {
          pluginId: normalized.id,
          operatorId: userId,
          action: PluginVersionActionType.SUBMIT,
          targetVersion: normalized.version,
          reason: normalizedChangelog,
        });

        return createdVersion;
      });
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const createdPlugin = await tx.plugin.create({
        data: {
          id: normalized.id,
          name: normalized.name,
          description: normalized.description,
          icon: normalized.icon,
          authorId: userId,
          versions: {
            create: {
              version: normalized.version,
              content: normalized.content as Prisma.InputJsonValue,
              changelog: data.changelog,
              status: 'PENDING',
            },
          },
        },
      });

      await this.createVersionActionLog(tx, {
        pluginId: normalized.id,
        operatorId: userId,
        action: PluginVersionActionType.SUBMIT,
        targetVersion: normalized.version,
        reason: normalizedChangelog,
      });

      return createdPlugin;
    });
  }

  async audit(
    pluginId: string,
    version: string,
    status: PluginStatus,
    adminId: string,
    reason?: string,
  ) {
    if (status === 'PENDING') {
      throw new BadRequestException({
        code: 'PLUGIN_VERSION_AUDIT_INVALID_STATUS',
        message: 'Audit status must be APPROVED, CHANGES_REQUIRED or REJECTED',
      });
    }

    const normalizedReason = this.normalizeOptionalText(reason);
    const reasonRequiredStatus: PluginStatus[] = [
      'REJECTED',
      'CHANGES_REQUIRED',
    ];
    if (reasonRequiredStatus.includes(status) && !normalizedReason) {
      throw new BadRequestException({
        code: 'PLUGIN_VERSION_AUDIT_REASON_REQUIRED',
        message: 'Audit reason is required',
      });
    }

    const finalAuditLog = reasonRequiredStatus.includes(status)
      ? normalizedReason
      : (normalizedReason ?? 'Approved by admin');

    if (finalAuditLog && finalAuditLog.length > MAX_AUDIT_LOG_LENGTH) {
      throw new BadRequestException({
        code: 'PLUGIN_VERSION_AUDIT_REASON_TOO_LONG',
        message: `Audit reason must be at most ${MAX_AUDIT_LOG_LENGTH} characters`,
      });
    }

    const existingVersion = await this.prisma.pluginVersion.findUnique({
      where: {
        pluginId_version: {
          pluginId,
          version,
        },
      },
      select: {
        id: true,
        deletedAt: true,
      },
    });

    if (!existingVersion) {
      throw new NotFoundException('Version not found');
    }

    if (existingVersion.deletedAt) {
      throw new BadRequestException({
        code: 'PLUGIN_VERSION_AUDIT_DELETED_FORBIDDEN',
        message: 'Deleted version cannot be audited',
      });
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const result = await tx.pluginVersion.update({
        where: {
          pluginId_version: {
            pluginId,
            version,
          },
        },
        data: {
          status,
          auditorId: adminId,
          auditLog: finalAuditLog,
        },
      });

      if (status === 'APPROVED') {
        const metadata = this.extractPluginSummaryFromContent(result.content);
        await tx.plugin.update({
          where: { id: pluginId },
          data: {
            ...metadata,
            activeVersionId: result.id,
            lastVersionActionAt: new Date(),
          },
        });
      }

      await this.createVersionActionLog(tx, {
        pluginId,
        operatorId: adminId,
        action: this.resolveAuditAction(status),
        targetVersion: version,
        reason: finalAuditLog,
      });

      return result;
    });
  }

  async delete(id: string, operatorId: string) {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const plugin = await tx.plugin.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!plugin) {
        throw new NotFoundException('Plugin not found');
      }

      await this.createVersionActionLog(tx, {
        pluginId: id,
        operatorId,
        action: PluginVersionActionType.PLUGIN_DELETE,
        reason: 'Plugin deleted by admin',
      });

      return tx.plugin.delete({
        where: { id },
      });
    });
  }

  async toggleVisibility(
    id: string,
    isPublic: boolean,
    isAdmin: boolean,
    operatorId: string,
    mode: 'FORCE' | 'NORMAL' = 'NORMAL',
    reason?: string,
  ) {
    const normalizedReason = this.normalizeOptionalText(reason);
    if (
      normalizedReason &&
      normalizedReason.length > MAX_VISIBILITY_REASON_LENGTH
    ) {
      throw new BadRequestException({
        code: 'PLUGIN_VISIBILITY_REASON_TOO_LONG',
        message: `Visibility reason must be at most ${MAX_VISIBILITY_REASON_LENGTH} characters`,
      });
    }

    const plugin = await this.prisma.plugin.findUnique({ where: { id } });
    if (!plugin) {
      throw new NotFoundException('Plugin not found');
    }

    if (isAdmin && !isPublic && !normalizedReason) {
      throw new BadRequestException({
        code: 'PLUGIN_VISIBILITY_REASON_REQUIRED',
        message:
          'Visibility reason is required when admin unpublishes a plugin',
      });
    }

    const data: {
      isPublic: boolean;
      adminDisabled?: boolean;
      adminDisableReason?: string | null;
    } = { isPublic };

    if (isAdmin) {
      if (mode === 'FORCE') {
        data.adminDisabled = !isPublic;
        data.adminDisableReason = isPublic ? null : normalizedReason;
      } else if (plugin.adminDisabled && isPublic) {
        throw new ConflictException({
          code: 'PLUGIN_VISIBILITY_ADMIN_DISABLED',
          message:
            'Plugin is force-disabled by admin. Use force republish to re-enable.',
        });
      } else if (!plugin.adminDisabled) {
        data.adminDisableReason = isPublic ? null : normalizedReason;
      }
    } else if (isPublic && plugin.adminDisabled) {
      throw new ForbiddenException('Plugin has been disabled by admin');
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updatedPlugin = await tx.plugin.update({
        where: { id },
        data,
      });

      await this.createVersionActionLog(tx, {
        pluginId: id,
        operatorId,
        action: this.resolveVisibilityAction(mode, isPublic),
        reason:
          normalizedReason ??
          `${plugin.isPublic ? 'public' : 'private'} -> ${
            isPublic ? 'public' : 'private'
          }`,
      });

      return updatedPlugin;
    });
  }

  async recordDownload(pluginId: string, ip: string) {
    const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
    const recentDownload = await this.prisma.pluginDownload.findFirst({
      where: {
        pluginId,
        ip,
        createdAt: {
          gte: tenSecondsAgo,
        },
      },
    });

    if (recentDownload) {
      return { success: false, message: 'Downloaded recently' };
    }

    await this.prisma.pluginDownload.create({
      data: {
        pluginId,
        ip,
      },
    });

    await this.prisma.plugin.update({
      where: { id: pluginId },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });
    return { success: true };
  }

  private extractPluginSummaryFromContent(content: unknown) {
    if (!content || typeof content !== 'object' || Array.isArray(content)) {
      return {};
    }

    const data = content as Record<string, unknown>;
    const summary: { name?: string; description?: string; icon?: string } = {};

    if (typeof data.name === 'string' && data.name.trim()) {
      summary.name = data.name.trim();
    }

    if (typeof data.description === 'string') {
      summary.description = data.description.trim();
    }

    if (typeof data.icon === 'string' && data.icon.trim()) {
      summary.icon = data.icon.trim();
    }

    return summary;
  }

  private normalizeOptionalText(value?: string) {
    if (typeof value !== 'string') {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private isResubmittableStatus(status: PluginStatus) {
    return status === 'REJECTED' || status === 'CHANGES_REQUIRED';
  }

  private resolveAuditAction(status: PluginStatus) {
    if (status === 'APPROVED') {
      return PluginVersionActionType.AUDIT_APPROVED;
    }

    if (status === 'CHANGES_REQUIRED') {
      return PluginVersionActionType.AUDIT_CHANGES_REQUIRED;
    }

    return PluginVersionActionType.AUDIT_REJECTED;
  }

  private resolveVisibilityAction(mode: 'FORCE' | 'NORMAL', isPublic: boolean) {
    if (mode === 'FORCE') {
      return isPublic
        ? PluginVersionActionType.FORCE_REPUBLISH
        : PluginVersionActionType.FORCE_UNPUBLISH;
    }

    return isPublic
      ? PluginVersionActionType.VISIBILITY_PUBLIC
      : PluginVersionActionType.VISIBILITY_PRIVATE;
  }

  private async createVersionActionLog(
    tx: Prisma.TransactionClient,
    payload: {
      pluginId: string;
      operatorId: string;
      action: PluginVersionActionType;
      fromVersion?: string | null;
      toVersion?: string | null;
      targetVersion?: string | null;
      reason?: string | null;
    },
  ) {
    await tx.pluginVersionActionLog.create({
      data: {
        pluginId: payload.pluginId,
        operatorId: payload.operatorId,
        action: payload.action,
        fromVersion: payload.fromVersion ?? null,
        toVersion: payload.toVersion ?? null,
        targetVersion: payload.targetVersion ?? null,
        reason: payload.reason ?? null,
      },
    });
  }
}
