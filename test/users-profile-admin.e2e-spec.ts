import {
  BadRequestException,
  CanActivate,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  INestApplication,
  Module,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { AuthUser } from '../src/common/types/auth-user.type';
import { AdminUsersController } from '../src/users/admin-users.controller';
import { ChangeMyPasswordDto } from '../src/users/dto/change-my-password.dto';
import { UpdateMyProfileDto } from '../src/users/dto/update-my-profile.dto';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';

type Role = 'DEVELOPER' | 'ADMIN';
type UserStatusView = 'ACTIVE' | 'BANNED' | 'PENDING';
type LoginSource = 'LOCAL' | 'GITHUB' | 'GOOGLE';
type AuthProvider = LoginSource | 'MIXED';

interface MemoryUser {
  id: string;
  username: string;
  displayName: string | null;
  email: string | null;
  pendingEmail: string | null;
  pendingEmailPurpose: 'EMAIL_CHANGE' | 'LOCAL_BIND' | null;
  avatar: string | null;
  bio: string | null;
  adminNote: string | null;
  role: Role;
  status: UserStatusView;
  authProvider: AuthProvider;
  oauthProvider: 'GITHUB' | 'GOOGLE' | null;
  emailVerifiedAt: Date | null;
  emailVerifyRequired: boolean;
  hasPassword: boolean;
  passwordPlain: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
  passwordUpdatedAt: Date | null;
  pluginCount: number;
  reviewCount: number;
}

class InMemoryUsersService {
  private users = new Map<string, MemoryUser>([
    [
      'admin-1',
      {
        id: 'admin-1',
        username: 'admin',
        displayName: 'Admin',
        email: 'admin@example.com',
        pendingEmail: null,
        pendingEmailPurpose: null,
        avatar: 'https://cdn.example.com/a.png',
        bio: 'super admin',
        adminNote: 'seed admin',
        role: 'ADMIN',
        status: 'ACTIVE',
        authProvider: 'LOCAL',
        oauthProvider: null,
        emailVerifiedAt: new Date('2026-01-01T00:00:00.000Z'),
        emailVerifyRequired: true,
        hasPassword: true,
        passwordPlain: 'AdminPass123',
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-01T00:00:00.000Z'),
        lastLoginAt: new Date('2026-03-08T10:00:00.000Z'),
        passwordUpdatedAt: new Date('2026-01-01T00:00:00.000Z'),
        pluginCount: 1,
        reviewCount: 0,
      },
    ],
    [
      'dev-1',
      {
        id: 'dev-1',
        username: 'developer',
        displayName: 'Developer',
        email: 'dev@example.com',
        pendingEmail: null,
        pendingEmailPurpose: null,
        avatar: 'https://cdn.example.com/d.png',
        bio: 'plugin dev',
        adminNote: null,
        role: 'DEVELOPER',
        status: 'ACTIVE',
        authProvider: 'LOCAL',
        oauthProvider: null,
        emailVerifiedAt: new Date('2026-01-02T00:00:00.000Z'),
        emailVerifyRequired: true,
        hasPassword: true,
        passwordPlain: 'DevPass123',
        createdAt: new Date('2026-01-02T00:00:00.000Z'),
        updatedAt: new Date('2026-01-02T00:00:00.000Z'),
        lastLoginAt: new Date('2026-03-08T11:00:00.000Z'),
        passwordUpdatedAt: new Date('2026-01-02T00:00:00.000Z'),
        pluginCount: 3,
        reviewCount: 2,
      },
    ],
    [
      'gh-1',
      {
        id: 'gh-1',
        username: 'octocat',
        displayName: 'Octo Cat',
        email: null,
        pendingEmail: null,
        pendingEmailPurpose: null,
        avatar: 'https://avatars.githubusercontent.com/u/583231?v=4',
        bio: null,
        adminNote: null,
        role: 'DEVELOPER',
        status: 'ACTIVE',
        authProvider: 'GITHUB',
        oauthProvider: 'GITHUB',
        emailVerifiedAt: null,
        emailVerifyRequired: false,
        hasPassword: false,
        passwordPlain: null,
        createdAt: new Date('2026-01-03T00:00:00.000Z'),
        updatedAt: new Date('2026-01-03T00:00:00.000Z'),
        lastLoginAt: new Date('2026-03-08T12:00:00.000Z'),
        passwordUpdatedAt: null,
        pluginCount: 0,
        reviewCount: 1,
      },
    ],
    [
      'go-1',
      {
        id: 'go-1',
        username: 'googler',
        displayName: 'Google User',
        email: 'go@example.com',
        pendingEmail: null,
        pendingEmailPurpose: null,
        avatar: 'https://cdn.example.com/g.png',
        bio: null,
        adminNote: null,
        role: 'DEVELOPER',
        status: 'ACTIVE',
        authProvider: 'GOOGLE',
        oauthProvider: 'GOOGLE',
        emailVerifiedAt: new Date('2026-01-04T00:00:00.000Z'),
        emailVerifyRequired: true,
        hasPassword: false,
        passwordPlain: null,
        createdAt: new Date('2026-01-04T00:00:00.000Z'),
        updatedAt: new Date('2026-01-04T00:00:00.000Z'),
        lastLoginAt: new Date('2026-03-08T12:30:00.000Z'),
        passwordUpdatedAt: null,
        pluginCount: 0,
        reviewCount: 0,
      },
    ],
  ]);

  async getMyProfile(userId: string) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return this.toSelfProfile(user);
  }

  async updateMyProfile(userId: string, payload: UpdateMyProfileDto) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'username')) {
      const username = String(payload.username || '').trim();
      if (!username) {
        throw new BadRequestException('USER_USERNAME_INVALID');
      }

      const taken = Array.from(this.users.values()).find(
        (item) => item.id !== userId && item.username === username,
      );
      if (taken) {
        throw new ConflictException('USER_USERNAME_TAKEN');
      }

      user.username = username;
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'displayName')) {
      user.displayName = this.normalizeNullableText(payload.displayName);
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'avatar')) {
      user.avatar = this.normalizeNullableText(payload.avatar);
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'bio')) {
      user.bio = this.normalizeNullableText(payload.bio);
    }

    user.updatedAt = new Date();
    return this.toSelfProfile(user);
  }

  async requestMyEmailChange(userId: string, email: string) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const nextEmail = email.trim().toLowerCase();
    if (!nextEmail) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    user.pendingEmail = nextEmail;
    user.pendingEmailPurpose = 'EMAIL_CHANGE';
    user.updatedAt = new Date();

    return {
      verificationSent: true,
      email: `${nextEmail.slice(0, 2)}***`,
    };
  }

  async resendMyEmailChangeVerification(userId: string) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!user.pendingEmail || user.pendingEmailPurpose !== 'EMAIL_CHANGE') {
      throw new BadRequestException('NO_PENDING_EMAIL_CHANGE');
    }

    return {
      resent: true,
      email: `${user.pendingEmail.slice(0, 2)}***`,
    };
  }

  async requestMyLocalBind(
    userId: string,
    payload: { email: string; password: string; confirmPassword: string },
  ) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (user.authProvider !== 'GITHUB' && user.authProvider !== 'GOOGLE') {
      throw new BadRequestException('USER_LOCAL_BIND_OAUTH_ONLY');
    }

    if (payload.password !== payload.confirmPassword) {
      throw new BadRequestException('USER_PASSWORD_CONFIRM_MISMATCH');
    }

    const nextEmail = payload.email.trim().toLowerCase();
    user.pendingEmail = nextEmail;
    user.pendingEmailPurpose = 'LOCAL_BIND';
    user.passwordPlain = payload.password;
    user.updatedAt = new Date();

    return {
      verificationSent: true,
      email: `${nextEmail.slice(0, 2)}***`,
    };
  }

  async resendMyLocalBindVerification(userId: string) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!user.pendingEmail || user.pendingEmailPurpose !== 'LOCAL_BIND') {
      throw new BadRequestException('NO_PENDING_LOCAL_BIND');
    }

    return {
      resent: true,
      email: `${user.pendingEmail.slice(0, 2)}***`,
    };
  }
  async changeMyPassword(userId: string, payload: ChangeMyPasswordDto) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const currentPassword = payload.currentPassword || '';
    const newPassword = payload.newPassword || '';
    const confirmNewPassword = payload.confirmNewPassword || '';

    if (!newPassword || !confirmNewPassword) {
      throw new BadRequestException('USER_PASSWORD_REQUIRED');
    }

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('USER_PASSWORD_CONFIRM_MISMATCH');
    }

    if (
      (user.authProvider === 'GITHUB' || user.authProvider === 'GOOGLE') &&
      !user.hasPassword
    ) {
      throw new BadRequestException('USER_LOCAL_BIND_REQUIRED');
    }

    if (user.hasPassword) {
      if (!currentPassword) {
        throw new BadRequestException('USER_PASSWORD_CURRENT_REQUIRED');
      }

      if (user.passwordPlain !== currentPassword) {
        throw new ForbiddenException('USER_PASSWORD_INCORRECT');
      }

      if (currentPassword === newPassword) {
        throw new BadRequestException('USER_PASSWORD_NOT_CHANGED');
      }
    }

    const hadPassword = user.hasPassword;
    user.hasPassword = true;
    user.passwordPlain = newPassword;
    user.passwordUpdatedAt = new Date();

    if (user.authProvider === 'GITHUB' || user.authProvider === 'GOOGLE') {
      user.oauthProvider = user.authProvider;
      user.authProvider = 'MIXED';
    }

    return {
      changed: true,
      hadPassword,
    };
  }

  async resendMyVerification(userId: string) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!user.email) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    return {
      resent: true,
      email: `${user.email.slice(0, 2)}***`,
    };
  }

  async findAdminUsers(input: {
    keyword?: string;
    role?: Role;
    status?: UserStatusView;
    page?: number;
    pageSize?: number;
  }) {
    const page = input.page && input.page > 0 ? input.page : 1;
    const pageSize = input.pageSize && input.pageSize > 0 ? input.pageSize : 20;
    const keyword = String(input.keyword || '')
      .trim()
      .toLowerCase();

    let list = Array.from(this.users.values());

    if (keyword) {
      list = list.filter((item) => {
        return [item.id, item.username, item.displayName, item.email]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(keyword));
      });
    }

    if (input.role) {
      list = list.filter((item) => item.role === input.role);
    }

    if (input.status) {
      list = list.filter((item) => item.status === input.status);
    }

    const total = list.length;
    const start = (page - 1) * pageSize;
    const items = list
      .slice(start, start + pageSize)
      .map((item) => this.toAdminRow(item));

    return {
      items,
      total,
      page,
      pageSize,
    };
  }

  async findAdminUserById(userId: string) {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return {
      ...this.toAdminRow(user),
      recentPlugins: [],
      reviewReplyCount: 0,
    };
  }

  async updateUserByAdmin(
    _operatorId: string,
    targetUserId: string,
    payload: {
      username?: string;
      displayName?: string | null;
      avatar?: string | null;
      email?: string | null;
      bio?: string | null;
      adminNote?: string | null;
    },
  ) {
    const user = this.users.get(targetUserId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'username')) {
      const username = String(payload.username || '').trim();
      if (!username) {
        throw new BadRequestException('USER_USERNAME_INVALID');
      }

      const taken = Array.from(this.users.values()).find(
        (item) => item.id !== targetUserId && item.username === username,
      );
      if (taken) {
        throw new ConflictException('USER_USERNAME_TAKEN');
      }

      user.username = username;
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'displayName')) {
      user.displayName = this.normalizeNullableText(payload.displayName);
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'avatar')) {
      user.avatar = this.normalizeNullableText(payload.avatar);
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'bio')) {
      user.bio = this.normalizeNullableText(payload.bio);
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'adminNote')) {
      user.adminNote = this.normalizeNullableText(payload.adminNote);
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'email')) {
      user.email = this.normalizeNullableText(payload.email);
      user.pendingEmail = null;
      user.pendingEmailPurpose = null;
      user.emailVerifiedAt = null;
      user.emailVerifyRequired = Boolean(user.email);
    }

    user.updatedAt = new Date();
    return this.findAdminUserById(targetUserId);
  }

  async updateRoleByAdmin(
    operatorId: string,
    targetUserId: string,
    role: Role,
  ) {
    if (operatorId === targetUserId) {
      throw new ForbiddenException('USER_SELF_ROLE_CHANGE_FORBIDDEN');
    }

    const user = this.users.get(targetUserId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    user.role = role;
    user.updatedAt = new Date();
    return this.findAdminUserById(targetUserId);
  }

  async updateStatusByAdmin(
    operatorId: string,
    targetUserId: string,
    status: UserStatusView,
  ) {
    if (status !== 'ACTIVE' && status !== 'BANNED') {
      throw new BadRequestException('USER_STATUS_INVALID');
    }

    if (operatorId === targetUserId) {
      throw new ForbiddenException('USER_SELF_STATUS_CHANGE_FORBIDDEN');
    }

    const user = this.users.get(targetUserId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    user.status = status;
    user.updatedAt = new Date();
    return this.findAdminUserById(targetUserId);
  }

  async resendVerificationByAdmin(_operatorId: string, targetUserId: string) {
    const user = this.users.get(targetUserId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!user.email) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    return {
      resent: true,
      email: `${user.email.slice(0, 2)}***`,
    };
  }

  async resetPasswordByAdmin(
    _operatorId: string,
    targetUserId: string,
    payload: { mode: 'LINK' | 'TEMP_PASSWORD' },
  ) {
    const user = this.users.get(targetUserId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!user.email) {
      throw new BadRequestException('USER_EMAIL_REQUIRED');
    }

    if (payload.mode === 'TEMP_PASSWORD') {
      user.hasPassword = true;
      user.passwordPlain = 'TempPass123';
      user.passwordUpdatedAt = new Date();
      if (user.authProvider === 'GITHUB' || user.authProvider === 'GOOGLE') {
        user.oauthProvider = user.authProvider;
        user.authProvider = 'MIXED';
      }
    }

    return {
      sent: true,
      mode: payload.mode,
      email: `${user.email.slice(0, 2)}***`,
    };
  }

  async unbindMyOAuthProvider(userId: string, provider: 'GITHUB' | 'GOOGLE') {
    const user = this.users.get(userId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    this.unbindOAuthProvider(user, provider);
    return this.toSelfProfile(user);
  }

  async forceUnbindOAuthProviderByAdmin(
    _operatorId: string,
    targetUserId: string,
    provider: 'GITHUB' | 'GOOGLE',
  ) {
    const user = this.users.get(targetUserId);
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    this.unbindOAuthProvider(user, provider);
    return this.findAdminUserById(targetUserId);
  }

  private unbindOAuthProvider(user: MemoryUser, provider: 'GITHUB' | 'GOOGLE') {
    if (user.authProvider === 'LOCAL') {
      throw new BadRequestException('USER_OAUTH_PROVIDER_NOT_BOUND');
    }

    if (user.authProvider === provider) {
      throw new BadRequestException('USER_LOGIN_METHOD_LAST_ONE');
    }

    if (user.authProvider !== 'MIXED' || user.oauthProvider !== provider) {
      throw new BadRequestException('USER_OAUTH_PROVIDER_NOT_BOUND');
    }

    user.authProvider = 'LOCAL';
    user.oauthProvider = null;
    user.updatedAt = new Date();
  }
  async confirmPasswordReset(payload: {
    token: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    if (!payload.token.trim()) {
      throw new BadRequestException('PASSWORD_RESET_TOKEN_INVALID');
    }

    if (
      !payload.newPassword ||
      payload.newPassword !== payload.confirmNewPassword
    ) {
      throw new BadRequestException('USER_PASSWORD_CONFIRM_MISMATCH');
    }

    return {
      reset: true,
    };
  }
  async findAllForAdmin() {
    return Array.from(this.users.values()).map((item) => this.toAdminRow(item));
  }

  private normalizeNullableText(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    const text = value.trim();
    return text ? text : null;
  }

  private resolveAuthProviders(user: MemoryUser): LoginSource[] {
    if (user.authProvider === 'LOCAL') {
      return ['LOCAL'];
    }

    if (user.authProvider === 'GITHUB') {
      return ['GITHUB'];
    }

    if (user.authProvider === 'GOOGLE') {
      return ['GOOGLE'];
    }

    if (user.oauthProvider === 'GOOGLE') {
      return ['LOCAL', 'GOOGLE'];
    }

    return ['LOCAL', 'GITHUB'];
  }

  private toSelfProfile(user: MemoryUser) {
    const authProviders = this.resolveAuthProviders(user);
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      pendingEmail: user.pendingEmail,
      pendingEmailPurpose: user.pendingEmailPurpose,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      status: user.status,
      authProvider: user.authProvider,
      accountType: user.authProvider,
      authProviders,
      emailVerified: Boolean(user.emailVerifiedAt),
      emailVerifiedAt: user.emailVerifiedAt,
      emailVerifyRequired: user.emailVerifyRequired,
      hasPassword: user.hasPassword,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
      passwordUpdatedAt: user.passwordUpdatedAt,
    };
  }

  private toAdminRow(user: MemoryUser) {
    const authProviders = this.resolveAuthProviders(user);
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      pendingEmail: user.pendingEmail,
      pendingEmailPurpose: user.pendingEmailPurpose,
      avatar: user.avatar,
      bio: user.bio,
      adminNote: user.adminNote,
      role: user.role,
      status: user.status,
      authProvider: user.authProvider,
      accountType: user.authProvider,
      authProviders,
      emailVerified: Boolean(user.emailVerifiedAt),
      emailVerifiedAt: user.emailVerifiedAt,
      emailVerifyRequired: user.emailVerifyRequired,
      pluginCount: user.pluginCount,
      reviewCount: user.reviewCount,
      joinedAt: user.createdAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
      passwordUpdatedAt: user.passwordUpdatedAt,
    };
  }
}

const testJwtGuard: CanActivate = {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
      user?: AuthUser;
    }>();

    const userId = req.headers['x-test-user-id'] || 'dev-1';
    const role = req.headers['x-test-role'] || 'DEVELOPER';

    req.user = {
      userId,
      username: 'tester',
      role,
      avatar: null,
    };

    return true;
  },
};

@Module({
  controllers: [UsersController, AdminUsersController],
  providers: [
    InMemoryUsersService,
    {
      provide: UsersService,
      useExisting: InMemoryUsersService,
    },
  ],
})
class UsersProfileAdminTestModule {}

describe('Users Profile + Admin User Management (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersProfileAdminTestModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(testJwtGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('developer should get and update own profile', async () => {
    await request(app.getHttpServer())
      .get('/users/me/profile')
      .set('x-test-user-id', 'dev-1')
      .set('x-test-role', 'DEVELOPER')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe('dev-1');
        expect(res.body.authProvider).toBe('LOCAL');
      });

    await request(app.getHttpServer())
      .patch('/users/me/profile')
      .set('x-test-user-id', 'dev-1')
      .set('x-test-role', 'DEVELOPER')
      .send({
        displayName: 'Dev Updated',
        bio: 'updated bio',
        avatar: 'https://cdn.example.com/dev-updated.png',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.displayName).toBe('Dev Updated');
        expect(res.body.bio).toBe('updated bio');
      });
  });

  it('github user should require local bind before password change', async () => {
    await request(app.getHttpServer())
      .patch('/users/me/password')
      .set('x-test-user-id', 'gh-1')
      .set('x-test-role', 'DEVELOPER')
      .send({
        newPassword: 'NewStrongPass123',
        confirmNewPassword: 'NewStrongPass123',
      })
      .expect(400)
      .expect((res) => {
        expect(String(res.body.message)).toContain('USER_LOCAL_BIND_REQUIRED');
      });
  });

  it('developer/github user should request email verification workflows', async () => {
    await request(app.getHttpServer())
      .post('/users/me/email-change/request')
      .set('x-test-user-id', 'dev-1')
      .set('x-test-role', 'DEVELOPER')
      .send({ email: 'dev2@example.com' })
      .expect(201)
      .expect((res) => {
        expect(res.body.verificationSent).toBe(true);
      });

    await request(app.getHttpServer())
      .post('/users/me/email-change/resend')
      .set('x-test-user-id', 'dev-1')
      .set('x-test-role', 'DEVELOPER')
      .expect(201)
      .expect((res) => {
        expect(res.body.resent).toBe(true);
      });

    await request(app.getHttpServer())
      .post('/users/me/local-bind/request')
      .set('x-test-user-id', 'gh-1')
      .set('x-test-role', 'DEVELOPER')
      .send({
        email: 'octo@example.com',
        password: 'OctoPass123',
        confirmPassword: 'OctoPass123',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.verificationSent).toBe(true);
      });

    await request(app.getHttpServer())
      .post('/users/me/local-bind/resend')
      .set('x-test-user-id', 'gh-1')
      .set('x-test-role', 'DEVELOPER')
      .expect(201)
      .expect((res) => {
        expect(res.body.resent).toBe(true);
      });
  });

  it('oauth-only users should not unbind their last login method', async () => {
    await request(app.getHttpServer())
      .delete('/users/me/oauth/github')
      .set('x-test-user-id', 'gh-1')
      .set('x-test-role', 'DEVELOPER')
      .expect(400)
      .expect((res) => {
        expect(String(res.body.message)).toContain(
          'USER_LOGIN_METHOD_LAST_ONE',
        );
      });

    await request(app.getHttpServer())
      .delete('/users/me/oauth/google')
      .set('x-test-user-id', 'go-1')
      .set('x-test-role', 'DEVELOPER')
      .expect(400)
      .expect((res) => {
        expect(String(res.body.message)).toContain(
          'USER_LOGIN_METHOD_LAST_ONE',
        );
      });
  });

  it('user can unbind one oauth provider when account is mixed', async () => {
    await request(app.getHttpServer())
      .post('/admin/users/go-1/password-reset')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ mode: 'TEMP_PASSWORD' })
      .expect(201);

    await request(app.getHttpServer())
      .delete('/users/me/oauth/google')
      .set('x-test-user-id', 'go-1')
      .set('x-test-role', 'DEVELOPER')
      .expect(200)
      .expect((res) => {
        expect(res.body.authProvider).toBe('LOCAL');
        expect(res.body.authProviders).toEqual(['LOCAL']);
      });
  });

  it('admin force-unbind should respect the at-least-one-login-method rule', async () => {
    await request(app.getHttpServer())
      .delete('/admin/users/go-1/oauth/google')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .expect(400)
      .expect((res) => {
        expect(String(res.body.message)).toContain(
          'USER_LOGIN_METHOD_LAST_ONE',
        );
      });

    await request(app.getHttpServer())
      .post('/admin/users/go-1/password-reset')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ mode: 'TEMP_PASSWORD' })
      .expect(201);

    await request(app.getHttpServer())
      .delete('/admin/users/go-1/oauth/google')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .expect(200)
      .expect((res) => {
        expect(res.body.authProvider).toBe('LOCAL');
        expect(res.body.authProviders).toEqual(['LOCAL']);
      });
  });

  it('developer should be forbidden from admin users APIs', async () => {
    await request(app.getHttpServer())
      .get('/admin/users')
      .set('x-test-user-id', 'dev-1')
      .set('x-test-role', 'DEVELOPER')
      .expect(403);
  });

  it('admin should list users and get user detail', async () => {
    await request(app.getHttpServer())
      .get('/admin/users?page=1&pageSize=2')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.length).toBeLessThanOrEqual(2);
        expect(res.body.total).toBeGreaterThan(0);
      });

    await request(app.getHttpServer())
      .get('/admin/users/dev-1')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe('dev-1');
      });
  });

  it('admin should be blocked from changing own role/status', async () => {
    await request(app.getHttpServer())
      .patch('/admin/users/admin-1/role')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ role: 'DEVELOPER' })
      .expect(403)
      .expect((res) => {
        expect(String(res.body.message)).toContain(
          'USER_SELF_ROLE_CHANGE_FORBIDDEN',
        );
      });

    await request(app.getHttpServer())
      .patch('/admin/users/admin-1/status')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ status: 'BANNED' })
      .expect(403)
      .expect((res) => {
        expect(String(res.body.message)).toContain(
          'USER_SELF_STATUS_CHANGE_FORBIDDEN',
        );
      });
  });

  it('admin should update target role/status and resend verification', async () => {
    await request(app.getHttpServer())
      .patch('/admin/users/dev-1/role')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ role: 'ADMIN' })
      .expect(200)
      .expect((res) => {
        expect(res.body.role).toBe('ADMIN');
      });

    await request(app.getHttpServer())
      .patch('/admin/users/dev-1/status')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ status: 'BANNED' })
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('BANNED');
      });

    await request(app.getHttpServer())
      .post('/admin/users/dev-1/resend-verification')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .expect(201)
      .expect((res) => {
        expect(res.body.resent).toBe(true);
      });

    await request(app.getHttpServer())
      .post('/admin/users/gh-1/resend-verification')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .expect(400)
      .expect((res) => {
        expect(String(res.body.message)).toContain('USER_EMAIL_REQUIRED');
      });
  });

  it('admin should trigger password reset email workflow', async () => {
    await request(app.getHttpServer())
      .post('/admin/users/dev-1/password-reset')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ mode: 'LINK' })
      .expect(201)
      .expect((res) => {
        expect(res.body.sent).toBe(true);
        expect(res.body.mode).toBe('LINK');
      });

    await request(app.getHttpServer())
      .post('/admin/users/dev-1/password-reset')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ mode: 'TEMP_PASSWORD' })
      .expect(201)
      .expect((res) => {
        expect(res.body.sent).toBe(true);
        expect(res.body.mode).toBe('TEMP_PASSWORD');
      });
  });
  it('legacy admin users endpoints should still work', async () => {
    await request(app.getHttpServer())
      .get('/users/admin/list')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });

    await request(app.getHttpServer())
      .patch('/users/dev-1/role')
      .set('x-test-user-id', 'admin-1')
      .set('x-test-role', 'ADMIN')
      .send({ role: 'DEVELOPER' })
      .expect(200)
      .expect((res) => {
        expect(res.body.role).toBe('DEVELOPER');
      });
  });
});
