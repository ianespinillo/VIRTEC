import type { AuthUser } from '@repo/common';
import type { Request } from 'express';
export interface AuthRequest extends Request {
    body: {
        user: AuthUser;
    } & Record<string, unknown>;
}
