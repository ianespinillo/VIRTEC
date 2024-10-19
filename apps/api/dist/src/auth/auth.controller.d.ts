import { UserDecorator } from '@/schools/types';
import type { LoginDniDTO, LoginEmailDTO } from '@repo/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginDni(body: LoginDniDTO, res: Response): Promise<{
        acces_token: string;
    }>;
    loginEmail(body: LoginEmailDTO, res: Response): Promise<{
        acces_token: string;
    }>;
    getRoles(user: UserDecorator): Promise<{
        id: number;
        name: string;
    }>;
}
