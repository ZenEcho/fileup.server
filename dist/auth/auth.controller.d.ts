import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    githubLogin(): Promise<void>;
    githubLoginCallback(req: any, res: Response): Promise<void>;
    getProfile(req: any): any;
}
