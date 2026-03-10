import { ExecutionContext } from '@nestjs/common';
declare const GithubAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GithubAuthGuard extends GithubAuthGuard_base {
    getAuthenticateOptions(context: ExecutionContext): {
        state: string;
    } | {
        state?: undefined;
    };
}
export {};
