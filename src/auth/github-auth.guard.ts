import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const state =
      typeof req.query.state === 'string' ? req.query.state.trim() : '';
    const code =
      typeof req.query.code === 'string' ? req.query.code.trim() : '';

    // Only pass custom state on the authorization step.
    if (!code && state) {
      return {
        state,
      };
    }

    return {};
  }
}
