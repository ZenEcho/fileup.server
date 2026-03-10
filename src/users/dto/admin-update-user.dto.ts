export class AdminUpdateUserDto {
  username?: string;
  displayName?: string | null;
  avatar?: string | null;
  email?: string | null;
  bio?: string | null;
  adminNote?: string | null;
}
