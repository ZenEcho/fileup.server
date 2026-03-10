import { ConfigService } from '@nestjs/config';
import { Strategy as GoogleOAuthStrategy } from 'passport-google-oauth20';
interface GoogleProfile {
    id: string;
    displayName?: string;
    name?: {
        givenName?: string;
    };
    emails?: Array<{
        value?: string | null;
    }>;
    photos?: Array<{
        value?: string | null;
    }>;
    _json?: {
        email_verified?: boolean;
    };
}
declare const GoogleStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => GoogleOAuthStrategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: GoogleProfile, done: (err: Error | null, user?: object | false) => void): void;
}
export {};
