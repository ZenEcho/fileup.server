import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import { EmailVerificationService } from '../auth/email-verification.service';
import { PasswordService } from '../auth/password.service';
import {
  AdminUserActionType,
  EmailVerificationPurpose,
  PendingEmailPurpose,
  Prisma,
  OAuthProvider,
  Role,
  UserStatus,
} from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../system-settings/mailer.service';
import { MailVerificationPolicyService } from '../system-settings/mail-verification-policy.service';
import {
  AdminQueryUsersDto,
  AdminUserStatusView,
} from './dto/admin-query-users.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { ChangeMyPasswordDto } from './dto/change-my-password.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';

interface GitHubProfile {
  username: string;
  photos?: Array<{
    value?: string | null;
  }>;
  email?: string | null;
  emailVerified?: boolean;
}

interface CreateLocalUserInput {
  username: string;
  email: string;
  passwordHash: string;
  emailVerifyRequired?: boolean;
}

interface RequestLocalBindInput {
  email: string;
  password: string;
  confirmPassword: string;
}

interface OAuthAccountPayload {
  provider: 'GITHUB' | 'GOOGLE';
  providerUserId: string;
  username: string;
  avatar: string | null;
  email?: string | null;
  emailVerified?: boolean;
}

interface GithubBindingPayload {
  githubId: string;
  username: string;
  avatar: string | null;
  email?: string | null;
  emailVerified?: boolean;
}

interface AdminResetPasswordInput {
  mode: 'LINK' | 'TEMP_PASSWORD';
}

interface UnbindOAuthOptions {
  operatorId?: string;
  byAdmin: boolean;
}

const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,32}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;
const DISPLAY_NAME_MAX_LENGTH = 100;
const BIO_MAX_LENGTH = 1000;
const AVATAR_MAX_LENGTH = 2048;
const ADMIN_NOTE_MAX_LENGTH = 2000;
const DEFAULT_PASSWORD_RESET_TOKEN_TTL_MINUTES = 30;

export type UserLoginSource = 'LOCAL' | 'GITHUB' | 'GOOGLE';
export type UserAuthProvider = 'LOCAL' | 'GITHUB' | 'GOOGLE' | 'MIXED';

@Injectable()
export class UsersService {
  private readonly passwordService: PasswordService;
  private readonly emailVerificationService: EmailVerificationService;

  constructor(
    private prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly mailVerificationPolicyService: MailVerificationPolicyService,
  ) {
    this.passwordService = new PasswordService();
    this.emailVerificationService = new EmailVerificationService(
      this.prisma,
      this.mailerService,
      this.mailVerificationPolicyService,
    );
  }

  async findOrCreate(githubId: string, profile: GitHubProfile) {
    return this.findOrCreateByOAuth({
      provider: 'GITHUB',
      providerUserId: githubId,
      username: profile.username,
      avatar: profile.photos?.[0]?.value || null,
      email: profile.email || null,
      emailVerified: Boolean(profile.emailVerified),
    });
  }

  async findOrCreateByOAuth(payload: OAuthAccountPayload) {
    const providerUserId = payload.providerUserId.trim();
    if (!providerUserId) {
      throw new BadRequestException('OAUTH_PROVIDER_ID_REQUIRED');
    }

    const email = this.normalizeNullableEmail(payload.email);
    if (email) {
      this.validateEmail(email);
    }

    const byIdentity = await this.prisma.userOAuthAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider: payload.provider,
          providerUserId,
        },
      },
      select: {
        id: true,
        userId: true,
        isActive: true,
        user: {
          select: {
            id: true,
            username: true,
            role: true,
            status: true,
            email: true,
            githubId: true,
            avatar: true,
            emailVerifiedAt: true,
          },
        },
      },
    });

    if (byIdentity) {
      if (!byIdentity.isActive) {
        throw new UnauthorizedException('USER_OAUTH_UNBOUND_REBIND_REQUIRED');
      }

      const linked = await this.prisma.user.findUnique({
        where: {
          id: byIdentity.userId,
        },
      });

      if (linked) {
        await this.syncOAuthUserByIdentity(
          byIdentity.userId,
          payload,
          email,
          providerUserId,
        );
        return linked;
      }

      // Self-heal invalid oauth mapping left by manual DB operations or stale data.
      await this.prisma.userOAuthAccount
        .delete({
          where: {
            id: byIdentity.id,
          },
        })
        .catch(() => null);
    }
    // Backward compatibility: old GitHub users may only have User.githubId
    // without a row in UserOAuthAccount (for example when migration backfill
    // was not executed). In that case we attach the oauth account first.
    if (payload.provider === 'GITHUB') {
      const byLegacyGithubId = await this.prisma.user.findUnique({
        where: {
          githubId: providerUserId,
        },
        select: {
          id: true,
          avatar: true,
          githubId: true,
          email: true,
        },
      });

      if (byLegacyGithubId) {
        const existingByProvider =
          await this.prisma.userOAuthAccount.findUnique({
            where: {
              provider_userId: {
                provider: payload.provider,
                userId: byLegacyGithubId.id,
              },
            },
            select: {
              providerUserId: true,
            },
          });

        if (
          existingByProvider &&
          existingByProvider.providerUserId !== providerUserId
        ) {
          throw new ConflictException('USER_GITHUB_ALREADY_BOUND');
        }

        await this.prisma.$transaction(async (tx) => {
          if (!existingByProvider) {
            await tx.userOAuthAccount.create({
              data: {
                userId: byLegacyGithubId.id,
                provider: payload.provider,
                providerUserId,
                providerEmail: email,
              },
            });
          }
          const data: Prisma.UserUpdateInput = {};

          if (!byLegacyGithubId.avatar && payload.avatar) {
            data.avatar = payload.avatar;
          }

          if (!byLegacyGithubId.email && email && payload.emailVerified) {
            data.email = email;
            data.emailVerifiedAt = new Date();
            data.emailVerifyRequired = false;
          }

          if (Object.keys(data).length > 0) {
            await tx.user.update({
              where: {
                id: byLegacyGithubId.id,
              },
              data,
            });
          }
        });

        const linked = await this.prisma.user.findUnique({
          where: {
            id: byLegacyGithubId.id,
          },
        });

        if (!linked) {
          throw new NotFoundException('USER_NOT_FOUND');
        }

        return linked;
      }
    }
    if (email && payload.emailVerified) {
      const byEmail = await this.prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          avatar: true,
          githubId: true,
          email: true,
        },
      });

      if (byEmail) {
        const existingByProvider =
          await this.prisma.userOAuthAccount.findUnique({
            where: {
              provider_userId: {
                provider: payload.provider,
                userId: byEmail.id,
              },
            },
            select: {
              providerUserId: true,
            },
          });

        if (
          existingByProvider &&
          existingByProvider.providerUserId !== providerUserId
        ) {
          throw new ConflictException('USER_OAUTH_ALREADY_BOUND');
        }

        await this.prisma.$transaction(async (tx) => {
          if (!existingByProvider) {
            await tx.userOAuthAccount.create({
              data: {
                userId: byEmail.id,
                provider: payload.provider,
                providerUserId,
                providerEmail: email,
              },
            });
          }
          const data: Prisma.UserUpdateInput = {};

          if (!byEmail.avatar && payload.avatar) {
            data.avatar = payload.avatar;
          }

          if (payload.provider === 'GITHUB' && !byEmail.githubId) {
            data.githubId = providerUserId;
          }

          if (!byEmail.email && email) {
            data.email = email;
            data.emailVerifiedAt = new Date();
            data.emailVerifyRequired = false;
          }

          if (Object.keys(data).length > 0) {
            await tx.user.update({
              where: {
                id: byEmail.id,
              },
              data,
            });
          }
        });

        const linked = await this.prisma.user.findUnique({
          where: {
            id: byEmail.id,
          },
        });

        if (!linked) {
          throw new NotFoundException('USER_NOT_FOUND');
        }

        return linked;
      }
    }
    if (email && payload.emailVerified) {
      await this.ensureEmailAvailable(email);
    }

    const username = await this.buildGithubUsername(
      this.normalizeUsername(payload.username),
    );

    const now = new Date();
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          githubId: payload.provider === 'GITHUB' ? providerUserId : null,
          username,
          displayName: username,
          avatar: payload.avatar,
          email: email && payload.emailVerified ? email : null,
          role: 'DEVELOPER',
          status: 'ACTIVE',
          emailVerifiedAt: email && payload.emailVerified ? now : null,
          emailVerifyRequired: false,
          lastLoginAt: now,
        },
      });

      await tx.userOAuthAccount.create({
        data: {
          userId: user.id,
          provider: payload.provider,
          providerUserId,
          providerEmail: email,
        },
      });

      return user;
    });
  }

  async bindOAuthAccount(userId: string, payload: OAuthAccountPayload) {
    const providerUserId = payload.providerUserId.trim();
    if (!providerUserId) {
      throw new BadRequestException('OAUTH_PROVIDER_ID_REQUIRED');
    }

    const current = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        passwordHash: true,
        avatar: true,
        email: true,
        githubId: true,
        oauthAccounts: {
          select: {
            provider: true,
            providerUserId: true,
            isActive: true,
          },
        },
      },
    });

    if (!current) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!current.passwordHash) {
      throw new BadRequestException(
        payload.provider === 'GITHUB'
          ? 'USER_GITHUB_BIND_LOCAL_ONLY'
          : 'USER_GOOGLE_BIND_LOCAL_ONLY',
      );
    }

    const existingOnCurrent = current.oauthAccounts.find(
      (item) => item.provider === payload.provider,
    );

    const canReactivateOnCurrent =
      Boolean(existingOnCurrent) &&
      existingOnCurrent?.providerUserId === providerUserId &&
      !existingOnCurrent?.isActive;

    if (existingOnCurrent && !canReactivateOnCurrent) {
      if (existingOnCurrent.providerUserId === providerUserId) {
        return {
          bound: true,
          alreadyBound: true,
          provider: payload.provider,
        };
      }

      throw new ConflictException(
        payload.provider === 'GITHUB'
          ? 'USER_GITHUB_ALREADY_BOUND'
          : 'USER_GOOGLE_ALREADY_BOUND',
      );
    }

    const email = this.normalizeNullableEmail(payload.email);
    if (email) {
      this.validateEmail(email);
    }

    const byIdentity = await this.prisma.userOAuthAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider: payload.provider,
          providerUserId,
        },
      },
      select: {
        id: true,
        userId: true,
        isActive: true,
      },
    });

    let shouldCreateOAuthIdentity = !byIdentity;
    let shouldReactivateOAuthIdentity = Boolean(
      byIdentity && byIdentity.userId === userId && !byIdentity.isActive,
    );

    if (byIdentity && byIdentity.userId !== userId) {
      const resolveResult = await this.resolveOAuthIdentityConflictForBind({
        identityId: byIdentity.id,
        sourceUserId: byIdentity.userId,
        currentUserId: userId,
        provider: payload.provider,
        providerUserId,
        providerEmail: email,
      });

      if (!resolveResult.resolved) {
        throw new ConflictException('USER_OAUTH_ALREADY_BOUND_TO_OTHER');
      }

      shouldCreateOAuthIdentity = resolveResult.shouldCreateIdentity;
      shouldReactivateOAuthIdentity = !resolveResult.shouldCreateIdentity;
    }

    if (email) {
      const existedByEmail = await this.prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (existedByEmail && existedByEmail.id !== userId) {
        throw new ConflictException('OAUTH_EMAIL_CONFLICT');
      }
    }

    await this.prisma.$transaction(async (tx) => {
      if (shouldCreateOAuthIdentity) {
        await tx.userOAuthAccount.create({
          data: {
            userId,
            provider: payload.provider,
            providerUserId,
            providerEmail: email,
          },
        });
      } else if (shouldReactivateOAuthIdentity && byIdentity) {
        await tx.userOAuthAccount.update({
          where: {
            id: byIdentity.id,
          },
          data: {
            isActive: true,
            unboundAt: null,
            providerEmail: email,
          },
        });
      }
      const data: Prisma.UserUpdateInput = {};

      if (!current.avatar && payload.avatar) {
        data.avatar = payload.avatar;
      }

      if (payload.provider === 'GITHUB' && !current.githubId) {
        data.githubId = providerUserId;
      }

      if (!current.email && email && payload.emailVerified) {
        data.email = email;
        data.emailVerifiedAt = new Date();
        data.emailVerifyRequired = false;
      }

      if (Object.keys(data).length > 0) {
        await tx.user.update({
          where: {
            id: userId,
          },
          data,
        });
      }
    });

    return {
      bound: true,
      alreadyBound: false,
      provider: payload.provider,
    };
  }

  private async resolveOAuthIdentityConflictForBind(input: {
    identityId: string;
    sourceUserId: string;
    currentUserId: string;
    provider: 'GITHUB' | 'GOOGLE';
    providerUserId: string;
    providerEmail: string | null;
  }) {
    const source = await this.prisma.user.findUnique({
      where: {
        id: input.sourceUserId,
      },
      select: {
        id: true,
        role: true,
        passwordHash: true,
        githubId: true,
        oauthAccounts: {
          select: {
            provider: true,
            providerUserId: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            plugins: true,
            reviewedVersions: true,
            deletedPluginVersions: true,
            pluginVersionActionLogs: true,
            pluginReviews: true,
            repliedReviews: true,
            pluginReviewReplies: true,
            emailVerificationTokens: true,
            passwordResetTokens: true,
            passwordResetRequestedBy: true,
            updatedMailConfigs: true,
            updatedCaptchaConfigs: true,
            systemConfigAuditLogs: true,
            adminUserActions: true,
            adminUserActionsTarget: true,
          },
        },
      },
    });

    if (!source) {
      await this.prisma.userOAuthAccount
        .delete({
          where: {
            id: input.identityId,
          },
        })
        .catch(() => null);

      return {
        resolved: true,
        shouldCreateIdentity: true,
      };
    }

    const isSameSingleIdentity =
      source.oauthAccounts.length === 1 &&
      source.oauthAccounts[0]?.provider === input.provider &&
      source.oauthAccounts[0]?.providerUserId === input.providerUserId;

    const hasOwnedData =
      source._count.plugins > 0 ||
      source._count.reviewedVersions > 0 ||
      source._count.deletedPluginVersions > 0 ||
      source._count.pluginVersionActionLogs > 0 ||
      source._count.pluginReviews > 0 ||
      source._count.repliedReviews > 0 ||
      source._count.pluginReviewReplies > 0 ||
      source._count.emailVerificationTokens > 0 ||
      source._count.passwordResetTokens > 0 ||
      source._count.passwordResetRequestedBy > 0 ||
      source._count.updatedMailConfigs > 0 ||
      source._count.updatedCaptchaConfigs > 0 ||
      source._count.systemConfigAuditLogs > 0 ||
      source._count.adminUserActions > 0 ||
      source._count.adminUserActionsTarget > 0;

    if (
      source.role === Role.ADMIN ||
      source.passwordHash ||
      !isSameSingleIdentity ||
      hasOwnedData
    ) {
      return {
        resolved: false,
        shouldCreateIdentity: false,
      };
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        if (
          input.provider === 'GITHUB' &&
          source.githubId &&
          source.githubId === input.providerUserId
        ) {
          await tx.user.update({
            where: {
              id: source.id,
            },
            data: {
              githubId: null,
            },
          });
        }

        await tx.userOAuthAccount.update({
          where: {
            id: input.identityId,
          },
          data: {
            userId: input.currentUserId,
            providerEmail: input.providerEmail,
            isActive: true,
            unboundAt: null,
          },
        });

        await tx.user.delete({
          where: {
            id: source.id,
          },
        });
      });
    } catch {
      return {
        resolved: false,
        shouldCreateIdentity: false,
      };
    }

    return {
      resolved: true,
      shouldCreateIdentity: false,
    };
  }

  async bindGithubAccount(userId: string, payload: GithubBindingPayload) {
    return this.bindOAuthAccount(userId, {
      provider: 'GITHUB',
      providerUserId: payload.githubId,
      username: payload.username,
      avatar: payload.avatar,
      email: payload.email || null,
      emailVerified: Boolean(payload.emailVerified),
    });
  }

  async isOAuthProviderBound(userId: string, provider: 'GITHUB' | 'GOOGLE') {
    const existed = await this.prisma.userOAuthAccount.findFirst({
      where: {
        provider,
        userId,
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    if (existed) {
      return true;
    }

    if (provider !== 'GITHUB') {
      return false;
    }

    const githubLegacy = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        githubId: true,
      },
    });

    return Boolean(githubLegacy?.githubId);
  }

  async unbindMyOAuthProvider(userId: string, provider: 'GITHUB' | 'GOOGLE') {
    await this.unbindOAuthProvider(userId, provider, {
      byAdmin: false,
    });

    return this.getMyProfile(userId);
  }

  async forceUnbindOAuthProviderByAdmin(
    operatorId: string,
    targetUserId: string,
    provider: 'GITHUB' | 'GOOGLE',
  ) {
    const result = await this.unbindOAuthProvider(targetUserId, provider, {
      operatorId,
      byAdmin: true,
    });

    await this.createAdminActionLog(
      operatorId,
      targetUserId,
      'FORCE_UNBIND_OAUTH',
      result,
    );

    return this.findAdminUserById(targetUserId);
  }

  private async unbindOAuthProvider(
    userId: string,
    provider: 'GITHUB' | 'GOOGLE',
    options: UnbindOAuthOptions,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        githubId: true,
        passwordHash: true,
        oauthAccounts: {
          select: {
            id: true,
            provider: true,
            providerUserId: true,
            isActive: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const authProvidersBefore = this.resolveAuthProviders(user);
    const targetProvider = provider as UserLoginSource;

    if (!authProvidersBefore.includes(targetProvider)) {
      throw new BadRequestException('USER_OAUTH_PROVIDER_NOT_BOUND');
    }

    if (authProvidersBefore.length <= 1) {
      throw new BadRequestException('USER_LOGIN_METHOD_LAST_ONE');
    }

    const activeIdentity = user.oauthAccounts.find(
      (item) => item.provider === provider && item.isActive,
    );

    const shouldClearGithubLegacy =
      provider === 'GITHUB' &&
      Boolean(user.githubId) &&
      (!activeIdentity || user.githubId === activeIdentity.providerUserId);

    await this.prisma.$transaction(async (tx) => {
      if (activeIdentity) {
        await tx.userOAuthAccount.update({
          where: {
            id: activeIdentity.id,
          },
          data: {
            isActive: false,
            unboundAt: new Date(),
          },
        });
      }

      if (shouldClearGithubLegacy) {
        await tx.user.update({
          where: {
            id: userId,
          },
          data: {
            githubId: null,
          },
        });
      }
    });

    return {
      provider,
      byAdmin: options.byAdmin,
      operatorId: options.operatorId || null,
      authProvidersBefore,
      authProvidersAfter: authProvidersBefore.filter(
        (item) => item !== targetProvider,
      ),
    };
  }
  private async syncOAuthUserByIdentity(
    userId: string,
    payload: OAuthAccountPayload,
    email: string | null,
    providerUserId: string,
  ) {
    const current = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        avatar: true,
        email: true,
        githubId: true,
      },
    });

    if (!current) {
      return;
    }
    const data: Prisma.UserUpdateInput = {};

    if (!current.avatar && payload.avatar) {
      data.avatar = payload.avatar;
    }

    if (payload.provider === 'GITHUB' && !current.githubId) {
      data.githubId = providerUserId;
    }

    if (!current.email && email && payload.emailVerified) {
      data.email = email;
      data.emailVerifiedAt = new Date();
      data.emailVerifyRequired = false;
    }

    if (Object.keys(data).length <= 0) {
      return;
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        oauthAccounts: {
          where: {
            isActive: true,
          },
          select: {
            provider: true,
            providerUserId: true,
          },
        },
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByUsername(username: string) {
    return this.prisma.user.findFirst({ where: { username } });
  }

  findLocalLoginCandidates(identifier: string, loginByEmail: boolean) {
    if (loginByEmail) {
      return this.prisma.user.findMany({
        where: {
          email: identifier,
          passwordHash: {
            not: null,
          },
        },
        select: {
          id: true,
          email: true,
          pendingEmail: true,
          pendingEmailPurpose: true,
          username: true,
          role: true,
          status: true,
          emailVerifiedAt: true,
          emailVerifyRequired: true,
          passwordHash: true,
          oauthAccounts: {
            where: {
              isActive: true,
            },
            select: {
              provider: true,
            },
          },
        },
      });
    }

    return this.prisma.user.findMany({
      where: {
        username: identifier,
        passwordHash: {
          not: null,
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        emailVerifiedAt: true,
        emailVerifyRequired: true,
        passwordHash: true,
        oauthAccounts: {
          where: {
            isActive: true,
          },
          select: {
            provider: true,
          },
        },
      },
    });
  }

  createLocalUser(input: CreateLocalUserInput) {
    return this.prisma.user.create({
      data: {
        githubId: null,
        username: input.username,
        displayName: input.username,
        email: input.email,
        passwordHash: input.passwordHash,
        passwordUpdatedAt: new Date(),
        role: 'DEVELOPER',
        status: 'ACTIVE',
        // Keep emailVerifyRequired as a legacy snapshot field. Runtime enforcement is resolved by MailVerificationPolicyService.
        emailVerifyRequired: input.emailVerifyRequired ?? true,
        emailVerifiedAt: null,
      },
    });
  }

  deleteById(userId: string) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async touchLastLogin(userId: string) {
    await this.prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          lastLoginAt: new Date(),
        },
      })
      .catch(() => null);
  }

  async getMyProfile(userId: string) {
    const row = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        pendingEmail: true,
        pendingEmailPurpose: true,
        avatar: true,
        bio: true,
        role: true,
        status: true,
        githubId: true,
        passwordHash: true,
        oauthAccounts: {
          where: {
            isActive: true,
          },
          select: {
            provider: true,
          },
        },
        emailVerifiedAt: true,
        emailVerifyRequired: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        passwordUpdatedAt: true,
      },
    });

    if (!row) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();

    return this.mapSelfProfile(row, mailVerificationEnforced);
  }

  async updateMyProfile(userId: string, payload: UpdateMyProfileDto) {
    const current = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatar: true,
        bio: true,
        email: true,
        pendingEmail: true,
        pendingEmailPurpose: true,
        role: true,
        status: true,
        githubId: true,
        passwordHash: true,
        oauthAccounts: {
          where: {
            isActive: true,
          },
          select: {
            provider: true,
          },
        },
        emailVerifiedAt: true,
        emailVerifyRequired: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        passwordUpdatedAt: true,
      },
    });

    if (!current) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();

    const data: Prisma.UserUpdateInput = {};

    if (Object.prototype.hasOwnProperty.call(payload, 'username')) {
      const username = this.normalizeUsername(payload.username);

      if (username !== current.username) {
        this.validateUsername(username);
        await this.ensureUsernameAvailable(username, userId);
        data.username = username;
      }
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'displayName')) {
      const displayName = this.normalizeNullableText(payload.displayName);
      this.validateDisplayName(displayName);
      data.displayName = displayName;
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'avatar')) {
      const avatar = this.normalizeNullableText(payload.avatar);
      this.validateAvatar(avatar);
      data.avatar = avatar;
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'bio')) {
      const bio = this.normalizeNullableText(payload.bio);
      this.validateBio(bio);
      data.bio = bio;
    }

    if (Object.keys(data).length === 0) {
      return this.mapSelfProfile(current, mailVerificationEnforced);
    }

    const updated = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        pendingEmail: true,
        pendingEmailPurpose: true,
        avatar: true,
        bio: true,
        role: true,
        status: true,
        githubId: true,
        passwordHash: true,
        oauthAccounts: {
          where: {
            isActive: true,
          },
          select: {
            provider: true,
          },
        },
        emailVerifiedAt: true,
        emailVerifyRequired: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        passwordUpdatedAt: true,
      },
    });

    return this.mapSelfProfile(updated, mailVerificationEnforced);
  }

  async requestMyEmailChange(userId: string, nextEmailInput: string) {
    const nextEmail = this.normalizeNullableEmail(nextEmailInput);
    this.validateEmail(nextEmail);

    if (!nextEmail) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!user.email) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    if (user.email === nextEmail) {
      throw new BadRequestException('USER_EMAIL_SAME_AS_CURRENT');
    }

    await this.ensureEmailAvailable(nextEmail, userId);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        pendingEmail: nextEmail,
        pendingEmailPurpose: PendingEmailPurpose.EMAIL_CHANGE,
      },
    });

    return this.emailVerificationService.sendVerificationForUser({
      userId,
      email: nextEmail,
      username: user.username,
      purpose: EmailVerificationPurpose.EMAIL_CHANGE,
    });
  }

  resendMyEmailChangeVerification(userId: string) {
    return this.emailVerificationService.resendForPendingPurpose({
      userId,
      purpose: EmailVerificationPurpose.EMAIL_CHANGE,
    });
  }

  async requestMyLocalBind(userId: string, payload: RequestLocalBindInput) {
    const email = this.normalizeNullableEmail(payload.email);
    const password = this.normalizePassword(payload.password);
    const confirmPassword = this.normalizePassword(payload.confirmPassword);

    if (!email || !password || !confirmPassword) {
      throw new BadRequestException('USER_LOCAL_BIND_REQUIRED_FIELDS');
    }

    this.validateEmail(email);
    this.validatePassword(password);

    if (password !== confirmPassword) {
      throw new BadRequestException('USER_PASSWORD_CONFIRM_MISMATCH');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        githubId: true,
        passwordHash: true,
        oauthAccounts: {
          where: {
            isActive: true,
          },
          select: {
            provider: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const hasOAuthIdentity =
      Boolean(user.githubId) || user.oauthAccounts.length > 0;

    if (!hasOAuthIdentity) {
      throw new BadRequestException('USER_LOCAL_BIND_OAUTH_ONLY');
    }

    if (user.passwordHash) {
      throw new BadRequestException('USER_LOCAL_BIND_ALREADY_BOUND');
    }

    await this.ensureEmailAvailable(email, userId);

    const pendingPasswordHash =
      await this.passwordService.hashPassword(password);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        pendingEmail: email,
        pendingEmailPurpose: PendingEmailPurpose.LOCAL_BIND,
        pendingPasswordHash,
      },
    });

    return this.emailVerificationService.sendVerificationForUser({
      userId,
      email,
      username: user.username,
      purpose: EmailVerificationPurpose.LOCAL_BIND,
    });
  }

  resendMyLocalBindVerification(userId: string) {
    return this.emailVerificationService.resendForPendingPurpose({
      userId,
      purpose: EmailVerificationPurpose.LOCAL_BIND,
    });
  }
  async changeMyPassword(userId: string, payload: ChangeMyPasswordDto) {
    const newPassword = this.normalizePassword(payload.newPassword);
    const confirmNewPassword = this.normalizePassword(
      payload.confirmNewPassword,
    );
    const currentPassword = this.normalizePassword(payload.currentPassword);

    if (!newPassword || !confirmNewPassword) {
      throw new BadRequestException('USER_PASSWORD_REQUIRED');
    }

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('USER_PASSWORD_CONFIRM_MISMATCH');
    }

    this.validatePassword(newPassword);

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        githubId: true,
        passwordHash: true,
        oauthAccounts: {
          where: {
            isActive: true,
          },
          select: {
            provider: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const hasOAuthIdentity =
      Boolean(user.githubId) || user.oauthAccounts.length > 0;
    if (hasOAuthIdentity && !user.passwordHash) {
      throw new BadRequestException('USER_LOCAL_BIND_REQUIRED');
    }

    if (user.passwordHash) {
      if (!currentPassword) {
        throw new BadRequestException('USER_PASSWORD_CURRENT_REQUIRED');
      }

      const matched = await this.passwordService.verifyPassword(
        currentPassword,
        user.passwordHash,
      );

      if (!matched) {
        throw new ForbiddenException('USER_PASSWORD_INCORRECT');
      }

      const sameAsOld = await this.passwordService.verifyPassword(
        newPassword,
        user.passwordHash,
      );

      if (sameAsOld) {
        throw new BadRequestException('USER_PASSWORD_NOT_CHANGED');
      }
    }

    const newHash = await this.passwordService.hashPassword(newPassword);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: newHash,
        passwordUpdatedAt: new Date(),
      },
    });

    return {
      changed: true,
      hadPassword: Boolean(user.passwordHash),
    };
  }

  async resendMyVerification(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!user.email) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    return this.emailVerificationService.resend(user.email);
  }

  async findAdminUsers(input: AdminQueryUsersDto) {
    const page = this.normalizePositiveInt(input.page, 1);
    const pageSize = Math.min(
      this.normalizePositiveInt(input.pageSize, 20),
      100,
    );

    const keyword = this.normalizeNullableText(input.keyword);
    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();

    const where = this.buildAdminQueryWhere({
      keyword,
      role: input.role,
      status: input.status,
      mailVerificationEnforced,
    });

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          githubId: true,
          email: true,
          pendingEmail: true,
          pendingEmailPurpose: true,
          username: true,
          displayName: true,
          avatar: true,
          role: true,
          status: true,
          emailVerifiedAt: true,
          emailVerifyRequired: true,
          passwordHash: true,
          oauthAccounts: {
            where: {
              isActive: true,
            },
            select: {
              provider: true,
            },
          },
          bio: true,
          adminNote: true,
          createdAt: true,
          updatedAt: true,
          lastLoginAt: true,
          passwordUpdatedAt: true,
          _count: {
            select: {
              plugins: true,
              pluginReviews: true,
            },
          },
        },
      }),
    ]);

    return {
      items: rows.map((row) =>
        this.mapAdminUser(row, mailVerificationEnforced),
      ),
      total,
      page,
      pageSize,
    };
  }

  async findAllForAdmin() {
    const response = await this.findAdminUsers({
      page: 1,
      pageSize: 200,
    });
    return response.items;
  }

  async findAdminUserById(userId: string) {
    const row = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        githubId: true,
        email: true,
        pendingEmail: true,
        pendingEmailPurpose: true,
        username: true,
        displayName: true,
        avatar: true,
        bio: true,
        adminNote: true,
        role: true,
        status: true,
        emailVerifiedAt: true,
        emailVerifyRequired: true,
        passwordHash: true,
        oauthAccounts: {
          where: {
            isActive: true,
          },
          select: {
            provider: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        passwordUpdatedAt: true,
        plugins: {
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            name: true,
            isPublic: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            plugins: true,
            pluginReviews: true,
            pluginReviewReplies: true,
          },
        },
      },
    });

    if (!row) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const mailVerificationEnforced =
      await this.mailVerificationPolicyService.isMailVerificationEnforced();

    return {
      ...this.mapAdminUser(row, mailVerificationEnforced),
      recentPlugins: row.plugins,
      reviewCount: row._count.pluginReviews,
      reviewReplyCount: row._count.pluginReviewReplies,
      updatedAt: row.updatedAt,
      passwordUpdatedAt: row.passwordUpdatedAt,
      adminNote: row.adminNote,
      bio: row.bio,
      displayName: row.displayName,
    };
  }

  async updateUserByAdmin(
    operatorId: string,
    targetUserId: string,
    payload: AdminUpdateUserDto,
  ) {
    const current = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatar: true,
        bio: true,
        adminNote: true,
      },
    });

    if (!current) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    const data: Prisma.UserUpdateInput = {};
    const changedFields: string[] = [];

    if (Object.prototype.hasOwnProperty.call(payload, 'username')) {
      const username = this.normalizeUsername(payload.username);
      if (username !== current.username) {
        this.validateUsername(username);
        await this.ensureUsernameAvailable(username, targetUserId);
        data.username = username;
        changedFields.push('username');
      }
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'displayName')) {
      const displayName = this.normalizeNullableText(payload.displayName);
      this.validateDisplayName(displayName);
      data.displayName = displayName;
      changedFields.push('displayName');
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'avatar')) {
      const avatar = this.normalizeNullableText(payload.avatar);
      this.validateAvatar(avatar);
      data.avatar = avatar;
      changedFields.push('avatar');
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'bio')) {
      const bio = this.normalizeNullableText(payload.bio);
      this.validateBio(bio);
      data.bio = bio;
      changedFields.push('bio');
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'adminNote')) {
      const adminNote = this.normalizeNullableText(payload.adminNote);
      this.validateAdminNote(adminNote);
      data.adminNote = adminNote;
      changedFields.push('adminNote');
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'email')) {
      const email = this.normalizeNullableEmail(payload.email);
      this.validateEmail(email);

      if (email !== current.email) {
        if (email) {
          await this.ensureEmailAvailable(email, targetUserId);
        }

        data.email = email;
        data.emailVerifiedAt = null;
        data.emailVerifyRequired = Boolean(email);
        data.pendingEmail = null;
        data.pendingEmailPurpose = null;
        data.pendingPasswordHash = null;
        changedFields.push('email');
      }
    }

    if (Object.keys(data).length > 0) {
      await this.prisma.user.update({
        where: {
          id: targetUserId,
        },
        data,
      });

      await this.createAdminActionLog(
        operatorId,
        targetUserId,
        'UPDATE_PROFILE',
        {
          changedFields,
        },
      );
    }

    return this.findAdminUserById(targetUserId);
  }

  async updateRoleByAdmin(
    operatorId: string,
    targetUserId: string,
    role: Role,
  ) {
    if (role !== 'ADMIN' && role !== 'DEVELOPER') {
      throw new BadRequestException('USER_ROLE_INVALID');
    }

    if (operatorId === targetUserId) {
      throw new ForbiddenException('USER_SELF_ROLE_CHANGE_FORBIDDEN');
    }

    const current = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!current) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (current.role === role) {
      return this.findAdminUserById(targetUserId);
    }

    await this.ensureLastAdminProtection(current, {
      nextRole: role,
      nextStatus: current.status,
    });

    await this.prisma.user.update({
      where: {
        id: targetUserId,
      },
      data: {
        role,
      },
    });

    await this.createAdminActionLog(operatorId, targetUserId, 'UPDATE_ROLE', {
      from: current.role,
      to: role,
    });

    return this.findAdminUserById(targetUserId);
  }

  async updateStatusByAdmin(
    operatorId: string,
    targetUserId: string,
    status: AdminUserStatusView,
  ) {
    if (status !== 'ACTIVE' && status !== 'BANNED') {
      throw new BadRequestException('USER_STATUS_INVALID');
    }

    if (operatorId === targetUserId) {
      throw new ForbiddenException('USER_SELF_STATUS_CHANGE_FORBIDDEN');
    }

    const nextStatus =
      status === 'ACTIVE' ? UserStatus.ACTIVE : UserStatus.DISABLED;

    const current = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!current) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (current.status === nextStatus) {
      return this.findAdminUserById(targetUserId);
    }

    await this.ensureLastAdminProtection(current, {
      nextRole: current.role,
      nextStatus,
    });

    await this.prisma.user.update({
      where: {
        id: targetUserId,
      },
      data: {
        status: nextStatus,
      },
    });

    await this.createAdminActionLog(operatorId, targetUserId, 'UPDATE_STATUS', {
      from: current.status,
      to: nextStatus,
    });

    return this.findAdminUserById(targetUserId);
  }

  async resendVerificationByAdmin(operatorId: string, targetUserId: string) {
    const target = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!target) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!target.email) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    const result = await this.emailVerificationService.resend(target.email);

    await this.createAdminActionLog(
      operatorId,
      targetUserId,
      'RESEND_VERIFICATION',
      {
        result,
      },
    );

    return result;
  }

  async resetPasswordByAdmin(
    operatorId: string,
    targetUserId: string,
    input: AdminResetPasswordInput,
  ) {
    if (input.mode !== 'LINK' && input.mode !== 'TEMP_PASSWORD') {
      throw new BadRequestException('USER_PASSWORD_RESET_MODE_INVALID');
    }

    const target = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!target) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!target.email) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    let result: {
      sent: boolean;
      mode: 'LINK' | 'TEMP_PASSWORD';
      email: string;
      expiresAt?: Date;
    };

    if (input.mode === 'LINK') {
      const token = randomBytes(24).toString('base64url');
      const tokenHash = this.hashValue(token);
      const ttlMinutes = Number(
        process.env['PASSWORD_RESET_TOKEN_TTL_MINUTES'] ||
          DEFAULT_PASSWORD_RESET_TOKEN_TTL_MINUTES,
      );
      const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

      await this.prisma.passwordResetToken.create({
        data: {
          userId: target.id,
          tokenHash,
          expiresAt,
          createdByAdminId: operatorId,
        },
      });

      const frontendUrl =
        process.env['FRONTEND_URL'] || 'http://localhost:5173';
      const resetUrl = `${frontendUrl}/auth/reset-password?token=${encodeURIComponent(
        token,
      )}`;

      await this.mailerService.sendPasswordResetEmail({
        to: target.email,
        username: target.username,
        resetUrl,
        expiresAt,
      });

      result = {
        sent: true,
        mode: 'LINK',
        email: this.maskEmail(target.email),
        expiresAt,
      };
    } else {
      const temporaryPassword = this.generateTemporaryPassword();
      const passwordHash =
        await this.passwordService.hashPassword(temporaryPassword);

      await this.prisma.user.update({
        where: {
          id: target.id,
        },
        data: {
          passwordHash,
          pendingPasswordHash: null,
          passwordUpdatedAt: new Date(),
        },
      });

      await this.mailerService.sendTemporaryPasswordEmail({
        to: target.email,
        username: target.username,
        temporaryPassword,
      });

      result = {
        sent: true,
        mode: 'TEMP_PASSWORD',
        email: this.maskEmail(target.email),
      };
    }

    await this.createAdminActionLog(
      operatorId,
      targetUserId,
      'RESET_PASSWORD',
      {
        mode: input.mode,
        result,
      },
    );

    return result;
  }

  async confirmPasswordReset(payload: {
    token: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    const token = payload.token.trim();
    const newPassword = this.normalizePassword(payload.newPassword);
    const confirmNewPassword = this.normalizePassword(
      payload.confirmNewPassword,
    );

    if (!token || !newPassword || !confirmNewPassword) {
      throw new BadRequestException('USER_PASSWORD_REQUIRED');
    }

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('USER_PASSWORD_CONFIRM_MISMATCH');
    }

    this.validatePassword(newPassword);

    const tokenHash = this.hashValue(token);
    const record = await this.prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
        consumedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!record || record.expiresAt.getTime() <= Date.now()) {
      throw new UnauthorizedException('PASSWORD_RESET_TOKEN_INVALID');
    }

    const nextPasswordHash =
      await this.passwordService.hashPassword(newPassword);
    const now = new Date();

    await this.prisma.$transaction([
      this.prisma.passwordResetToken.update({
        where: {
          id: record.id,
        },
        data: {
          consumedAt: now,
        },
      }),
      this.prisma.passwordResetToken.updateMany({
        where: {
          userId: record.userId,
          consumedAt: null,
          id: {
            not: record.id,
          },
        },
        data: {
          consumedAt: now,
        },
      }),
      this.prisma.user.update({
        where: {
          id: record.userId,
        },
        data: {
          passwordHash: nextPasswordHash,
          pendingPasswordHash: null,
          passwordUpdatedAt: now,
        },
      }),
    ]);

    return {
      reset: true,
    };
  }
  private normalizePositiveInt(value: unknown, fallback: number) {
    const num = Number(value);
    if (Number.isFinite(num) && num > 0) {
      return Math.floor(num);
    }
    return fallback;
  }

  private normalizeUsername(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
  }

  private normalizePassword(value: unknown) {
    return typeof value === 'string' ? value : '';
  }

  private normalizeNullableText(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    const text = value.trim();
    return text ? text : null;
  }

  private normalizeNullableEmail(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    const email = value.trim().toLowerCase();
    return email ? email : null;
  }

  private validateUsername(username: string) {
    if (!USERNAME_PATTERN.test(username)) {
      throw new BadRequestException('USER_USERNAME_INVALID');
    }
  }

  private validateEmail(email: string | null) {
    if (!email) {
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      throw new BadRequestException('USER_EMAIL_INVALID');
    }
  }

  private validatePassword(password: string) {
    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      throw new BadRequestException('USER_PASSWORD_WEAK');
    }
  }

  private validateDisplayName(displayName: string | null) {
    if (!displayName) {
      return;
    }

    if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
      throw new BadRequestException('USER_DISPLAY_NAME_TOO_LONG');
    }
  }

  private validateBio(bio: string | null) {
    if (!bio) {
      return;
    }

    if (bio.length > BIO_MAX_LENGTH) {
      throw new BadRequestException('USER_BIO_TOO_LONG');
    }
  }

  private validateAvatar(avatar: string | null) {
    if (!avatar) {
      return;
    }

    if (avatar.length > AVATAR_MAX_LENGTH) {
      throw new BadRequestException('USER_AVATAR_TOO_LONG');
    }

    if (!/^https?:\/\//i.test(avatar)) {
      throw new BadRequestException('USER_AVATAR_INVALID_URL');
    }
  }

  private validateAdminNote(note: string | null) {
    if (!note) {
      return;
    }

    if (note.length > ADMIN_NOTE_MAX_LENGTH) {
      throw new BadRequestException('USER_ADMIN_NOTE_TOO_LONG');
    }
  }

  private async ensureUsernameAvailable(
    username: string,
    excludeUserId?: string,
  ) {
    const existing = await this.prisma.user.findFirst({
      where: {
        username,
        ...(excludeUserId
          ? {
              id: {
                not: excludeUserId,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new ConflictException('USER_USERNAME_TAKEN');
    }
  }

  private async ensureEmailAvailable(email: string, excludeUserId?: string) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            pendingEmail: email,
          },
        ],
        ...(excludeUserId
          ? {
              id: {
                not: excludeUserId,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new ConflictException('USER_EMAIL_TAKEN');
    }
  }

  private buildAdminQueryWhere(input: {
    keyword: string | null;
    role?: Role;
    status?: AdminUserStatusView;
    mailVerificationEnforced: boolean;
  }): Prisma.UserWhereInput {
    const and: Prisma.UserWhereInput[] = [];

    if (input.keyword) {
      and.push({
        OR: [
          {
            id: {
              contains: input.keyword,
            },
          },
          {
            username: {
              contains: input.keyword,
            },
          },
          {
            displayName: {
              contains: input.keyword,
            },
          },
          {
            email: {
              contains: input.keyword,
            },
          },
          {
            pendingEmail: {
              contains: input.keyword,
            },
          },
          {
            githubId: {
              contains: input.keyword,
            },
          },
          {
            oauthAccounts: {
              some: {
                isActive: true,
                OR: [
                  {
                    providerUserId: {
                      contains: input.keyword,
                    },
                  },
                  {
                    providerEmail: {
                      contains: input.keyword,
                    },
                  },
                ],
              },
            },
          },
        ],
      });
    }

    if (input.role) {
      and.push({
        role: input.role,
      });
    }

    if (input.status === 'BANNED') {
      and.push({
        status: UserStatus.DISABLED,
      });
    }

    if (input.status === 'PENDING') {
      if (!input.mailVerificationEnforced) {
        and.push({
          id: '__PENDING_DISABLED__',
        });
      } else {
        and.push({
          status: UserStatus.ACTIVE,
          passwordHash: {
            not: null,
          },
          email: {
            not: null,
          },
          emailVerifiedAt: null,
        });
      }
    }

    if (input.status === 'ACTIVE') {
      if (!input.mailVerificationEnforced) {
        and.push({
          status: UserStatus.ACTIVE,
        });
      } else {
        and.push({
          status: UserStatus.ACTIVE,
          OR: [
            {
              passwordHash: null,
            },
            {
              email: null,
            },
            {
              emailVerifiedAt: {
                not: null,
              },
            },
          ],
        });
      }
    }

    if (and.length === 0) {
      return {};
    }

    return {
      AND: and,
    };
  }
  private resolveAuthProviders(row: {
    githubId: string | null;
    passwordHash: string | null;
    oauthAccounts: Array<{ provider: OAuthProvider; isActive?: boolean }>;
  }): UserLoginSource[] {
    const providers = new Set<UserLoginSource>();

    if (row.passwordHash) {
      providers.add('LOCAL');
    }

    const hasGithub =
      Boolean(row.githubId) ||
      row.oauthAccounts.some(
        (item) =>
          item.provider === OAuthProvider.GITHUB && item.isActive !== false,
      );

    if (hasGithub) {
      providers.add('GITHUB');
    }

    const hasGoogle = row.oauthAccounts.some(
      (item) =>
        item.provider === OAuthProvider.GOOGLE && item.isActive !== false,
    );

    if (hasGoogle) {
      providers.add('GOOGLE');
    }

    const orderedProviders: UserLoginSource[] = ['LOCAL', 'GITHUB', 'GOOGLE'];
    return orderedProviders.filter((item) => providers.has(item));
  }

  private resolveAuthProvider(row: {
    githubId: string | null;
    passwordHash: string | null;
    oauthAccounts: Array<{ provider: OAuthProvider; isActive?: boolean }>;
  }): UserAuthProvider {
    const providers = this.resolveAuthProviders(row);

    if (providers.length <= 0) {
      return 'LOCAL';
    }

    if (providers.length === 1) {
      return providers[0] as UserAuthProvider;
    }

    return 'MIXED';
  }

  private resolveStatusView(
    row: {
      status: UserStatus;
      passwordHash: string | null;
      email: string | null;
      emailVerifiedAt: Date | null;
    },
    mailVerificationEnforced: boolean,
  ): AdminUserStatusView {
    return this.mailVerificationPolicyService.resolveAccountStatus(
      row,
      mailVerificationEnforced,
    );
  }
  private mapSelfProfile(
    row: {
      id: string;
      username: string;
      displayName: string | null;
      email: string | null;
      pendingEmail: string | null;
      pendingEmailPurpose: PendingEmailPurpose | null;
      avatar: string | null;
      bio: string | null;
      role: Role;
      status: UserStatus;
      githubId: string | null;
      passwordHash: string | null;
      oauthAccounts: Array<{ provider: OAuthProvider; isActive?: boolean }>;
      emailVerifiedAt: Date | null;
      emailVerifyRequired: boolean;
      createdAt: Date;
      updatedAt: Date;
      lastLoginAt: Date | null;
      passwordUpdatedAt: Date | null;
    },
    mailVerificationEnforced: boolean,
  ) {
    const authProviders = this.resolveAuthProviders(row);
    const authProvider = this.resolveAuthProvider(row);
    const verificationRequiredNow =
      this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(
        row,
        mailVerificationEnforced,
      );

    return {
      id: row.id,
      username: row.username,
      displayName: row.displayName,
      email: row.email,
      pendingEmail: row.pendingEmail,
      pendingEmailPurpose: row.pendingEmailPurpose,
      avatar: row.avatar,
      bio: row.bio,
      role: row.role,
      status: this.resolveStatusView(row, mailVerificationEnforced),
      authProvider,
      accountType: authProvider,
      authProviders,
      emailVerified: Boolean(row.emailVerifiedAt),
      emailVerifiedAt: row.emailVerifiedAt,
      emailVerifyRequired: row.emailVerifyRequired,
      mailEnabled: mailVerificationEnforced,
      emailVerificationEnforced: mailVerificationEnforced,
      verificationRequiredNow,
      hasPassword: Boolean(row.passwordHash),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      lastLoginAt: row.lastLoginAt,
      passwordUpdatedAt: row.passwordUpdatedAt,
    };
  }
  private mapAdminUser(
    row: {
      id: string;
      githubId: string | null;
      email: string | null;
      pendingEmail: string | null;
      pendingEmailPurpose: PendingEmailPurpose | null;
      username: string;
      displayName: string | null;
      avatar: string | null;
      bio: string | null;
      adminNote: string | null;
      role: Role;
      status: UserStatus;
      emailVerifiedAt: Date | null;
      emailVerifyRequired: boolean;
      passwordHash: string | null;
      oauthAccounts: Array<{ provider: OAuthProvider; isActive?: boolean }>;
      createdAt: Date;
      updatedAt: Date;
      lastLoginAt: Date | null;
      passwordUpdatedAt: Date | null;
      _count: {
        plugins: number;
        pluginReviews: number;
      };
    },
    mailVerificationEnforced: boolean,
  ) {
    const authProviders = this.resolveAuthProviders(row);
    const authProvider = this.resolveAuthProvider(row);
    const verificationRequiredNow =
      this.mailVerificationPolicyService.shouldRequireEmailVerificationNow(
        row,
        mailVerificationEnforced,
      );

    return {
      id: row.id,
      githubId: row.githubId,
      email: row.email,
      pendingEmail: row.pendingEmail,
      pendingEmailPurpose: row.pendingEmailPurpose,
      username: row.username,
      displayName: row.displayName,
      avatar: row.avatar,
      bio: row.bio,
      adminNote: row.adminNote,
      role: row.role,
      status: this.resolveStatusView(row, mailVerificationEnforced),
      emailVerified: Boolean(row.emailVerifiedAt),
      emailVerifiedAt: row.emailVerifiedAt,
      emailVerifyRequired: row.emailVerifyRequired,
      mailEnabled: mailVerificationEnforced,
      emailVerificationEnforced: mailVerificationEnforced,
      verificationRequiredNow,
      authProvider,
      accountType: authProvider,
      authProviders,
      pluginCount: row._count.plugins,
      reviewCount: row._count.pluginReviews,
      joinedAt: row.createdAt,
      updatedAt: row.updatedAt,
      lastLoginAt: row.lastLoginAt,
      passwordUpdatedAt: row.passwordUpdatedAt,
    };
  }
  private async ensureLastAdminProtection(
    current: {
      id: string;
      role: Role;
      status: UserStatus;
    },
    next: {
      nextRole: Role;
      nextStatus: UserStatus;
    },
  ) {
    const currentlyActiveAdmin =
      current.role === Role.ADMIN && current.status === UserStatus.ACTIVE;

    const keepsActiveAdmin =
      next.nextRole === Role.ADMIN && next.nextStatus === UserStatus.ACTIVE;

    if (!currentlyActiveAdmin || keepsActiveAdmin) {
      return;
    }

    const anotherAdminCount = await this.prisma.user.count({
      where: {
        id: {
          not: current.id,
        },
        role: Role.ADMIN,
        status: UserStatus.ACTIVE,
      },
    });

    if (anotherAdminCount <= 0) {
      throw new BadRequestException('USER_LAST_ADMIN_PROTECTED');
    }
  }

  private async buildGithubUsername(rawUsername: string) {
    const fallback = `github_${Date.now().toString().slice(-8)}`;
    const base = (rawUsername || fallback).replace(/[^a-zA-Z0-9_-]/g, '_');

    let candidate = base.slice(0, 32);
    let seq = 0;

    // Keep username unique for OAuth-created users without changing existing local uniqueness rules.
    while (true) {
      const existing = await this.prisma.user.findFirst({
        where: {
          username: candidate,
        },
        select: {
          id: true,
        },
      });

      if (!existing) {
        return candidate;
      }

      seq += 1;
      const suffix = `_${seq}`;
      const head = base.slice(0, Math.max(1, 32 - suffix.length));
      candidate = `${head}${suffix}`;
    }
  }
  private async createAdminActionLog(
    operatorId: string,
    targetUserId: string,
    action: AdminUserActionType,
    detail: unknown,
  ) {
    await this.prisma.adminUserActionLog.create({
      data: {
        operatorId,
        targetUserId,
        action,
        detail: detail ? JSON.stringify(detail) : null,
      },
    });
  }

  private hashValue(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }

  private maskEmail(email: string) {
    const [name, domain] = email.split('@');
    if (!name || !domain) {
      return '***';
    }

    if (name.length <= 2) {
      return `${name[0] || '*'}***@${domain}`;
    }

    return `${name.slice(0, 2)}***@${domain}`;
  }

  private generateTemporaryPassword() {
    const raw = randomBytes(18)
      .toString('base64url')
      .replace(/[^a-zA-Z0-9]/g, '');
    const core = raw.slice(0, 10);
    return `${core}Aa9`;
  }
}
