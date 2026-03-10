import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { SystemSettingsModule } from '../system-settings/system-settings.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailVerificationService } from './email-verification.service';
import { GithubAuthGuard } from './github-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';
import { GithubStrategy } from './github.strategy';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password.service';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    SystemSettingsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secretKey',
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    EmailVerificationService,
    GithubStrategy,
    GoogleStrategy,
    GithubAuthGuard,
    GoogleAuthGuard,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
