import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';
import { TokenOptions } from '@repo/common';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    private configService;
    constructor(usersService: UsersService, configService: ConfigService);
    validate(token_payload: TokenOptions): Promise<{
        user: {
            permissions: string[];
            id: string;
            password: string;
            role_id: number;
            created_at: Date;
            deleted_at: Date | null;
            updated_at: Date | null;
            email: string;
            is_active: boolean;
            school_id: number;
        };
    }>;
}
export {};
