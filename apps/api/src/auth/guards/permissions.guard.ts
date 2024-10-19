import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const permissions = this.reflector.get<string[]>(
			'permissions',
			context.getHandler(),
		);
		const userP = context.switchToHttp().getRequest().user.permissions;
		return this.mathPermissions(userP, permissions);
	}
	private mathPermissions(userPermissions: string[], permissions: string[]) {
		return permissions.every((permission) =>
			userPermissions.includes(permission),
		);
	}
}
