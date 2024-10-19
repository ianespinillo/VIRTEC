import type { UsersService } from '@/users/users.service';
import type { ConfigService } from '@nestjs/config';
import type { AuthUser } from '@repo/common';
import type { Request } from 'express';
declare const JwtRefreshStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private UsersService;
    private configService;
    constructor(UsersService: UsersService, configService: ConfigService);
    validate(req: Request, { id }: AuthUser): Promise<{
        token: string;
        is_active: boolean;
    }>;
}
export {};
