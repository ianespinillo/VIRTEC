import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import type { LoginDniDTO, LoginEmailDTO } from '@repo/common';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    loginWithDni(user: LoginDniDTO): Promise<{
        acces_token: string;
    }>;
    loginWithEmail(user: LoginEmailDTO): Promise<{
        acces_token: string;
    }>;
    getRole(role_id: number): Promise<{
        id: number;
        name: string;
    }>;
}
