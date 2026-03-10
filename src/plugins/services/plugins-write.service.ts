import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PluginStatus, Prisma } from '../../prisma/prisma-client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePluginDto } from '../dto/create-plugin.dto';
import { normalizeCreatePluginPayload } from '../plugin-payload';

@Injectable()
export class PluginsWriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreatePluginDto) {
    const normalized = normalizeCreatePluginPayload(data);

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
        },
      });

      if (existingVersion) {
        if (existingVersion.status === 'REJECTED') {
          throw new BadRequestException({
            code: 'PLUGIN_VERSION_REJECTED_RESUBMIT_REQUIRES_NEW_VERSION',
            message:
              'Rejected version cannot be resubmitted with the same version number. Please bump the version before submitting again.',
          });
        }

        throw new BadRequestException({
          code: 'PLUGIN_VERSION_ALREADY_EXISTS',
          message:
            'Version already exists. Please use a new version number before submitting.',
        });
      }

      return this.prisma.pluginVersion.create({
        data: {
          pluginId: normalized.id,
          version: normalized.version,
          content: normalized.content as Prisma.InputJsonValue,
          changelog: data.changelog,
          status: 'PENDING',
        },
      });
    }

    return this.prisma.plugin.create({
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
  }

  async audit(
    pluginId: string,
    version: string,
    status: PluginStatus,
    adminId: string,
  ) {
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

    const result = await this.prisma.pluginVersion.update({
      where: {
        pluginId_version: {
          pluginId,
          version,
        },
      },
      data: {
        status,
        auditorId: adminId,
        auditLog: `Status updated to ${status} by admin`,
      },
    });

    if (status === 'APPROVED') {
      const metadata = this.extractPluginSummaryFromContent(result.content);
      await this.prisma.plugin.update({
        where: { id: pluginId },
        data: {
          ...metadata,
          activeVersionId: result.id,
        },
      });
    }

    return result;
  }

  async delete(id: string) {
    return this.prisma.plugin.delete({
      where: { id },
    });
  }

  async toggleVisibility(
    id: string,
    isPublic: boolean,
    isAdmin: boolean,
    mode: 'FORCE' | 'NORMAL' = 'NORMAL',
  ) {
    const plugin = await this.prisma.plugin.findUnique({ where: { id } });
    if (!plugin) {
      throw new NotFoundException('Plugin not found');
    }

    const data: { isPublic: boolean; adminDisabled?: boolean } = { isPublic };

    if (isAdmin) {
      if (mode === 'FORCE') {
        data.adminDisabled = !isPublic;
      } else if (plugin.adminDisabled && isPublic) {
        throw new ConflictException({
          code: 'PLUGIN_VISIBILITY_ADMIN_DISABLED',
          message:
            'Plugin is force-disabled by admin. Use force republish to re-enable.',
        });
      }
    } else if (isPublic && plugin.adminDisabled) {
      throw new ForbiddenException('Plugin has been disabled by admin');
    }

    return this.prisma.plugin.update({
      where: { id },
      data,
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
}
