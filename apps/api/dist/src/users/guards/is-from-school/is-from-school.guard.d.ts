import { type CanActivate, type ExecutionContext } from '@nestjs/common';
export declare class IsFromSchoolGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
