import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-github2';
declare const GithubStrategy_base: new (...args: [options: import("passport-github2").StrategyOptionsWithRequest] | [options: import("passport-github2").StrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GithubStrategy extends GithubStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: {
        id: string;
        username: string;
        photos?: Array<{
            value?: string | null;
        }>;
        emails?: Array<{
            value?: string | null;
            verified?: boolean;
        }>;
    }, done: (err: Error | null, user?: object | false) => void): void;
}
export {};
