import { UsersService } from '@/users/users.service';
import {
	BadRequestException,
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
	constructor(private usersService: UsersService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: Request = context.switchToHttp().getRequest();
		if (!req.body.user) {
			throw new BadRequestException('User not found');
		}
		const { is_active } = await this.usersService.isActiveUser(
			req.body.user.email,
		);
		if (!is_active) {
			throw new BadRequestException('User not active');
		}
		return true;
	}
}
