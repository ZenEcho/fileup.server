import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PluginStatus } from '../generated/client/client';

export interface CreatePluginDto {
  id: string;
  name: string;
  description: string;
  icon: string;
  version: string;
  content: Record<string, any>; // JSON
  changelog?: string;
}

interface PluginContent {
  name: string;
  description: string;
  icon: string;
  [key: string]: any;
}

@Injectable()
export class PluginsService {
  constructor(private prisma: PrismaService) {}

  async findAll(status: PluginStatus = 'APPROVED') {
    console.log(`Finding all plugins with status: ${status}`);
    const plugins = await this.prisma.plugin.findMany({
      where: {
        isPublic: true,
        versions: {
          some: {
            status: status,
          },
        },
      },
      include: {
        versions: {
          where: { status: status },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        author: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    console.log(`Found ${plugins.length} plugins`);
    return plugins;
  }

  async findAllPending() {
    return this.prisma.plugin.findMany({
      where: {
        versions: {
          some: {
            status: 'PENDING',
          },
        },
      },
      include: {
        versions: {
          where: { status: 'PENDING' },
          orderBy: { createdAt: 'desc' },
        },
        author: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findByAuthor(authorId: string) {
    return this.prisma.plugin.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        versions: {
          orderBy: { createdAt: 'desc' },
        },
        author: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.plugin.findUnique({
      where: { id },
      include: {
        versions: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        author: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findOneAnyStatus(id: string) {
    return this.prisma.plugin.findUnique({
      where: { id },
      include: {
        versions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        author: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async create(userId: string, data: CreatePluginDto) {
    // Check if plugin exists
    const existingPlugin = await this.prisma.plugin.findUnique({
      where: { id: data.id },
    });

    if (existingPlugin) {
      // Check author
      if (existingPlugin.authorId !== userId) {
        throw new ForbiddenException('You are not the author of this plugin');
      }

      // Check version uniqueness
      const existingVersion = await this.prisma.pluginVersion.findUnique({
        where: {
          pluginId_version: {
            pluginId: data.id,
            version: data.version,
          },
        },
      });

      if (existingVersion) {
        throw new BadRequestException('Version already exists');
      }

      // Update plugin metadata and create version
      // NOTE: Metadata update is deferred until approval (see audit method)
      // EXCEPT: If we want to support partial updates? No, strictly require audit.
      // Actually, if we don't update metadata here, the new version is created but the main plugin still shows old name/desc.
      // This is desired behavior: "Edit requires re-audit".

      // Ensure content JSON has consistent metadata with the outer fields
      const content = {
        ...data.content,
        id: data.id,
        name: data.name,
        version: data.version,
        description: data.description,
        icon: data.icon,
      };

      return this.prisma.pluginVersion.create({
        data: {
          pluginId: data.id,
          version: data.version,
          content: content,
          changelog: data.changelog,
          status: 'PENDING',
        },
      });
    } else {
      // Create new plugin and version
      // Ensure content JSON has consistent metadata
      const content = {
        ...data.content,
        id: data.id,
        name: data.name,
        version: data.version,
        description: data.description,
        icon: data.icon,
      };

      return this.prisma.plugin.create({
        data: {
          id: data.id,
          name: data.name,
          description: data.description,
          icon: data.icon,
          authorId: userId,
          versions: {
            create: {
              version: data.version,
              content: content,
              changelog: data.changelog,
              status: 'PENDING',
            },
          },
        },
      });
    }
  }

  async audit(
    pluginId: string,
    version: string,
    status: PluginStatus,
    adminId: string,
  ) {
    const result = await this.prisma.pluginVersion.update({
      where: {
        pluginId_version: {
          pluginId: pluginId,
          version: version,
        },
      },
      data: {
        status,
        auditorId: adminId,
        auditLog: `Status updated to ${status} by admin`,
      },
    });

    // If approved, sync metadata to main Plugin table
    if (status === 'APPROVED') {
      const content = result.content as unknown as PluginContent;
      await this.prisma.plugin.update({
        where: { id: pluginId },
        data: {
          name: content.name,
          description: content.description,
          icon: content.icon,
        },
      });
    }

    return result;
  }

  async findAllForAdmin() {
    return this.prisma.plugin.findMany({
      include: {
        versions: {
          orderBy: { createdAt: 'desc' },
        },
        author: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    // Delete physical files if necessary (not applicable here as we store in DB)
    // Cascade delete is handled by Prisma schema
    return this.prisma.plugin.delete({
      where: { id },
    });
  }

  async toggleVisibility(id: string, isPublic: boolean, isAdmin: boolean) {
    const data: { isPublic: boolean; adminDisabled?: boolean } = { isPublic };
    if (isAdmin && !isPublic) {
      data.adminDisabled = true;
    } else if (isAdmin && isPublic) {
      data.adminDisabled = false;
    } else if (!isAdmin && isPublic) {
      // Developer trying to publish
      const plugin = await this.prisma.plugin.findUnique({ where: { id } });
      if (plugin?.adminDisabled) {
        throw new ForbiddenException('Plugin has been disabled by admin');
      }
    }

    return this.prisma.plugin.update({
      where: { id },
      data,
    });
  }

  async recordDownload(pluginId: string, ip: string) {
    // Check if downloaded in the last 10 seconds
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
}
