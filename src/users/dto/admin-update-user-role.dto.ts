import { Role } from '../../prisma/prisma-client';

export class AdminUpdateUserRoleDto {
  role!: Role;
}
