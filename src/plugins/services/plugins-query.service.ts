import { Injectable } from '@nestjs/common';
import { PluginStatus } from '../../prisma/prisma-client';
import { PrismaService } from '../../prisma/prisma.service';
import { PluginVersionBase } from '../types/plugin-version-base.type';

@Injectable()
export class PluginsQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status: PluginStatus = 'APPROVED') {
    if (status !== 'APPROVED') {
      return this.prisma.plugin.findMany({
        where: {
          isPublic: true,
          versions: {
            some: {
              status,
              deletedAt: null,
            },
          },
        },
        include: {
          versions: {
            where: { status, deletedAt: null },
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

    const plugins = await this.prisma.plugin.findMany({
      where: {
        isPublic: true,
        OR: [
          {
            activeVersion: {
              is: {
                status: 'APPROVED',
                deletedAt: null,
              },
            },
          },
          {
            activeVersionId: null,
            versions: {
              some: {
                status: 'APPROVED',
                deletedAt: null,
              },
            },
          },
        ],
      },
      include: {
        activeVersion: true,
        versions: {
          where: { status: 'APPROVED', deletedAt: null },
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

    return plugins.map((plugin) => ({
      ...plugin,
      versions: this.pickApprovedDisplayVersion(
        plugin.activeVersion as PluginVersionBase | null,
        plugin.versions as PluginVersionBase[],
      ),
    }));
  }

  async findAllPending() {
    return this.prisma.plugin.findMany({
      where: {
        versions: {
          some: {
            status: 'PENDING',
            deletedAt: null,
          },
        },
      },
      include: {
        versions: {
          where: { status: 'PENDING', deletedAt: null },
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
        authorId,
      },
      include: {
        versions: {
          where: { deletedAt: null },
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
    const plugin = await this.prisma.plugin.findUnique({
      where: { id },
      include: {
        activeVersion: true,
        versions: {
          where: { status: 'APPROVED', deletedAt: null },
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

    if (!plugin) {
      return null;
    }

    return {
      ...plugin,
      versions: this.pickApprovedDisplayVersion(
        plugin.activeVersion as PluginVersionBase | null,
        plugin.versions as PluginVersionBase[],
      ),
    };
  }

  async findOneAnyStatus(id: string) {
    return this.prisma.plugin.findUnique({
      where: { id },
      include: {
        versions: {
          where: { deletedAt: null },
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

  async findAllForAdmin() {
    return this.prisma.plugin.findMany({
      include: {
        versions: {
          where: {
            deletedAt: null,
          },
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

  private pickApprovedDisplayVersion<
    T extends { status: PluginStatus; deletedAt: Date | null },
  >(activeVersion: T | null | undefined, approvedVersions: T[]): T[] {
    if (
      activeVersion &&
      activeVersion.status === 'APPROVED' &&
      activeVersion.deletedAt === null
    ) {
      return [activeVersion];
    }

    return approvedVersions.length > 0 ? [approvedVersions[0]] : [];
  }
}
