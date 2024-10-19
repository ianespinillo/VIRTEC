import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Permissions } from '@repo/common';
import { PermissionsGuard } from '../guards/permissions.guard';

export const PermissionsNeeded = (...permissions: Permissions[]) => {
	return applyDecorators(
		SetMetadata('permissions', permissions),
		UseGuards(AuthGuard('jwt'), PermissionsGuard),
	);
};
