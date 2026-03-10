import { Role } from '../../prisma/prisma-client';

export type AdminUserStatusView = 'ACTIVE' | 'BANNED' | 'PENDING';

export class AdminQueryUsersDto {
  keyword?: string;
  role?: Role;
  status?: AdminUserStatusView;
  page?: number;
  pageSize?: number;
}
