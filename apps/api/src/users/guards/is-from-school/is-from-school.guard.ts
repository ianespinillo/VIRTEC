import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class IsFromSchoolGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const req: Request = context.switchToHttp().getRequest();
		const { school_id } = req.body;
		if (school_id !== req.body.user?.school_id) {
			throw new UnauthorizedException('Unauthorized');
		}
		return true;
	}
}
