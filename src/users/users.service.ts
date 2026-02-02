import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(githubId: string, profile: GitHubProfile) {
    return this.prisma.user.upsert({
      where: { githubId },
      update: {
        username: profile.username,
        avatar: profile.photos?.[0]?.value,
      },
      create: {
        githubId,
        username: profile.username,
        avatar: profile.photos?.[0]?.value,
        role: 'DEVELOPER',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

type GitHubProfile = {
  username: string;
  photos?: Array<{
    value?: string | null;
  }>;
};
