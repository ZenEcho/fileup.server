"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const prisma_module_1 = require("../prisma/prisma.module");
const system_settings_module_1 = require("../system-settings/system-settings.module");
const users_module_1 = require("../users/users.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const email_verification_service_1 = require("./email-verification.service");
const github_auth_guard_1 = require("./github-auth.guard");
const google_auth_guard_1 = require("./google-auth.guard");
const github_strategy_1 = require("./github.strategy");
const google_strategy_1 = require("./google.strategy");
const jwt_strategy_1 = require("./jwt.strategy");
const password_service_1 = require("./password.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            prisma_module_1.PrismaModule,
            system_settings_module_1.SystemSettingsModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'secretKey',
                    signOptions: { expiresIn: '7d' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            password_service_1.PasswordService,
            email_verification_service_1.EmailVerificationService,
            github_strategy_1.GithubStrategy,
            google_strategy_1.GoogleStrategy,
            github_auth_guard_1.GithubAuthGuard,
            google_auth_guard_1.GoogleAuthGuard,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map