export class ChangeMyPasswordDto {
  currentPassword?: string;
  newPassword!: string;
  confirmNewPassword!: string;
}
