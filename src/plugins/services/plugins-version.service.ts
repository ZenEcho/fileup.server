import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  PluginStatus,
  PluginVersionActionType,
} from '../../prisma/prisma-client';
import { PrismaService } from '../../prisma/prisma.service';
import { PluginVersionBase } from '../types/plugin-version-base.type';

@Injectable()
export class PluginsVersionService {
  constructor(private readonly prisma: PrismaService) {}

  async findVersions(
    pluginId: string,
    userId: string,
    userRole: string,
    includeDeleted: boolean,
  ) {
    const plugin = await this.prisma.plugin.findUnique({
      where: { id: pluginId },
      select: {
        id: true,
        authorId: true,
        activeVersionId: true,
        activeVersion: {
          select: {
            id: true,
            version: true,
            status: true,
            deletedAt: true,
          },
        },
        versions: {
          where: includeDeleted ? {} : { deletedAt: null },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            version: true,
            status: true,
            changelog: true,
            createdAt: true,
            deletedAt: true,
          },
        },
      },
    });

    if (!plugin) {
      throw new NotFoundException({
        code: 'PLUGIN_NOT_FOUND',
        message: 'Plugin not found',
      });
    }

    this.ensureVersionManagePermission(plugin.authorId, userId, userRole);

    const approvedAvailable = (plugin.versions as PluginVersionBase[]).filter(
      (item) => item.status === 'APPROVED' && item.deletedAt === null,
    );
    const effectiveActive = this.resolveEffectiveActiveVersion(
      plugin.activeVersionId,
      plugin.activeVersion as PluginVersionBase | null,
      approvedAvailable,
    );

    if (effectiveActive && plugin.activeVersionId !== effectiveActive.id) {
      // Best effort pointer self-heal for historical data.
      await this.prisma.plugin.update({
        where: { id: pluginId },
        data: { activeVersionId: effectiveActive.id },
      });
    }

    return {
      pluginId,
      activeVersion: effectiveActive?.version ?? null,
      versions: (plugin.versions as PluginVersionBase[]).map((item) => ({
        id: item.id,
        version: item.version,
        status: item.status,
        isActive: effectiveActive ? effectiveActive.id === item.id : false,
        changelog: item.changelog,
        createdAt: item.createdAt,
        deletedAt: item.deletedAt,
      })),
    };
  }

  async rollbackVersion(
    pluginId: string,
    version: string,
    userId: string,
    userRole: string,
    reason?: string,
  ) {
    const normalizedReason = this.normalizeOptionalText(reason);

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const plugin = await tx.plugin.findUnique({
        where: { id: pluginId },
        select: {
          id: true,
          authorId: true,
          activeVersionId: true,
          activeVersion: {
            select: {
              id: true,
              version: true,
              status: true,
              deletedAt: true,
            },
          },
          versions: {
            where: {
              status: 'APPROVED',
              deletedAt: null,
            },
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              version: true,
              status: true,
              deletedAt: true,
              content: true,
            },
          },
        },
      });

      if (!plugin) {
        throw new NotFoundException({
          code: 'PLUGIN_NOT_FOUND',
          message: 'Plugin not found',
        });
      }

      this.ensureVersionManagePermission(plugin.authorId, userId, userRole);

      const targetVersion = (plugin.versions as PluginVersionBase[]).find(
        (item) => item.version === version,
      );
      if (!targetVersion) {
        throw new BadRequestException({
          code: 'PLUGIN_VERSION_ROLLBACK_INVALID_TARGET',
          message:
            'Rollback target must be an approved and non-deleted version',
        });
      }

      const currentActive = this.resolveEffectiveActiveVersion(
        plugin.activeVersionId,
        plugin.activeVersion as PluginVersionBase | null,
        plugin.versions as PluginVersionBase[],
      );

      if (!currentActive) {
        throw new ConflictException({
          code: 'PLUGIN_VERSION_NO_APPROVED_ACTIVE',
          message: 'No approved active version is available',
        });
      }

      if (currentActive.version === targetVersion.version) {
        throw new ConflictException({
          code: 'PLUGIN_VERSION_ALREADY_ACTIVE',
          message: 'Target version is already active',
        });
      }

      const metadata = this.extractPluginSummaryFromContent(
        targetVersion.content,
      );

      await tx.plugin.update({
        where: { id: pluginId },
        data: {
          activeVersionId: targetVersion.id,
          lastVersionActionAt: new Date(),
          ...metadata,
        },
      });

      await tx.pluginVersionActionLog.create({
        data: {
          pluginId,
          operatorId: userId,
          action: PluginVersionActionType.ROLLBACK,
          fromVersion: currentActive.version,
          toVersion: targetVersion.version,
          reason: normalizedReason,
        },
      });

      return {
        success: true,
        pluginId,
        fromVersion: currentActive.version,
        toVersion: targetVersion.version,
        activeVersion: targetVersion.version,
      };
    });
  }

  async deleteVersion(
    pluginId: string,
    version: string,
    userId: string,
    userRole: string,
    reason?: string,
  ) {
    const normalizedReason = this.normalizeOptionalText(reason);

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const plugin = await tx.plugin.findUnique({
        where: { id: pluginId },
        select: {
          id: true,
          authorId: true,
          activeVersionId: true,
          activeVersion: {
            select: {
              id: true,
              version: true,
              status: true,
              deletedAt: true,
            },
          },
          versions: {
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              version: true,
              status: true,
              deletedAt: true,
            },
          },
        },
      });

      if (!plugin) {
        throw new NotFoundException({
          code: 'PLUGIN_NOT_FOUND',
          message: 'Plugin not found',
        });
      }

      this.ensureVersionManagePermission(plugin.authorId, userId, userRole);

      const targetVersion = (plugin.versions as PluginVersionBase[]).find(
        (item) => item.version === version && item.deletedAt === null,
      );
      if (!targetVersion) {
        throw new NotFoundException({
          code: 'PLUGIN_VERSION_NOT_FOUND',
          message: 'Version not found',
        });
      }

      const approvedAvailable = (plugin.versions as PluginVersionBase[]).filter(
        (item) => item.status === 'APPROVED' && item.deletedAt === null,
      );
      const currentActive = this.resolveEffectiveActiveVersion(
        plugin.activeVersionId,
        plugin.activeVersion as PluginVersionBase | null,
        approvedAvailable,
      );

      if (currentActive && currentActive.id === targetVersion.id) {
        throw new ConflictException({
          code: 'PLUGIN_VERSION_DELETE_ACTIVE_FORBIDDEN',
          message: 'Active version cannot be deleted',
        });
      }

      if (
        targetVersion.status === 'APPROVED' &&
        approvedAvailable.length <= 1
      ) {
        throw new ConflictException({
          code: 'PLUGIN_VERSION_DELETE_LAST_APPROVED_FORBIDDEN',
          message: 'At least one approved version must be retained',
        });
      }

      await tx.pluginVersion.update({
        where: {
          pluginId_version: {
            pluginId,
            version,
          },
        },
        data: {
          deletedAt: new Date(),
          deletedById: userId,
          deleteReason: normalizedReason,
        },
      });

      await tx.plugin.update({
        where: { id: pluginId },
        data: {
          lastVersionActionAt: new Date(),
        },
      });

      await tx.pluginVersionActionLog.create({
        data: {
          pluginId,
          operatorId: userId,
          action: PluginVersionActionType.DELETE,
          targetVersion: targetVersion.version,
          reason: normalizedReason,
        },
      });

      return {
        success: true,
        pluginId,
        deletedVersion: targetVersion.version,
      };
    });
  }

  async findVersionActions(pluginId: string, userId: string, userRole: string) {
    const plugin = await this.prisma.plugin.findUnique({
      where: { id: pluginId },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!plugin) {
      throw new NotFoundException({
        code: 'PLUGIN_NOT_FOUND',
        message: 'Plugin not found',
      });
    }

    this.ensureVersionManagePermission(plugin.authorId, userId, userRole);

    const logs = (await this.prisma.pluginVersionActionLog.findMany({
      where: { pluginId },
      include: {
        operator: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })) as {
      id: string;
      action: PluginVersionActionType;
      fromVersion: string | null;
      toVersion: string | null;
      targetVersion: string | null;
      reason: string | null;
      createdAt: Date;
      operator: { id: string; username: string; avatar: string | null };
    }[];

    return {
      pluginId,
      actions: logs.map((item) => ({
        id: item.id,
        action: item.action,
        fromVersion: item.fromVersion,
        toVersion: item.toVersion,
        targetVersion: item.targetVersion,
        reason: item.reason,
        createdAt: item.createdAt,
        operator: {
          id: item.operator.id,
          username: item.operator.username,
          avatar: item.operator.avatar,
        },
      })),
    };
  }

  private resolveEffectiveActiveVersion(
    activeVersionId: string | null,
    activeVersion: {
      id: string;
      version: string;
      status: PluginStatus;
      deletedAt: Date | null;
    } | null,
    approvedVersions: Array<{
      id: string;
      version: string;
      status: PluginStatus;
      deletedAt: Date | null;
    }>,
  ) {
    if (
      activeVersion &&
      activeVersionId === activeVersion.id &&
      activeVersion.status === 'APPROVED' &&
      activeVersion.deletedAt === null
    ) {
      return activeVersion;
    }

    return approvedVersions.length > 0 ? approvedVersions[0] : null;
  }

  private ensureVersionManagePermission(
    authorId: string,
    userId: string,
    userRole: string,
  ) {
    if (userRole !== 'ADMIN' && authorId !== userId) {
      throw new ForbiddenException({
        code: 'PLUGIN_VERSION_FORBIDDEN',
        message: 'You do not have permission to manage this plugin version',
      });
    }
  }

  private normalizeOptionalText(value?: string) {
    if (typeof value !== 'string') {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
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
}
