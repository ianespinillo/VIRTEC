import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../guards/permissions.guard';
import type { Permissions } from '@repo/types/src/auth/types';

export const PermissionsNeeded = (...permissions: Permissions[]) => {
	return applyDecorators(
		SetMetadata('permissions', permissions),
		UseGuards(AuthGuard('jwt'), PermissionsGuard)
	);
};
