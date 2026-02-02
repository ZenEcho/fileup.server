import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOrCreate(githubId: string, profile: GitHubProfile): Promise<{
        id: string;
        githubId: string;
        username: string;
        avatar: string | null;
        role: import("../generated/client/enums").Role;
        createdAt: Date;
    }>;
    findOne(id: string): import("../generated/client/models").Prisma__UserClient<{
        id: string;
        githubId: string;
        username: string;
        avatar: string | null;
        role: import("../generated/client/enums").Role;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/client/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
type GitHubProfile = {
    username: string;
    photos?: Array<{
        value?: string | null;
    }>;
};
export {};
