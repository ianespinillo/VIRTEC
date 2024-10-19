import { UsersService } from '@/users/users.service';
import { type CanActivate, type ExecutionContext } from '@nestjs/common';
export declare class UserGuard implements CanActivate {
    private usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
