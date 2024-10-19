import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { User } from '@/auth/decorators/user.decorator';

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { type AuthUser, type CreateUserDTO, PERMISSIONS } from '@repo/common';
import { PreceptorsService } from '../services/preceptors.service';

@Controller('preceptors')
export class PreceptorsController {
	constructor(private preceptorService: PreceptorsService) {}
	@PermissionsNeeded(PERMISSIONS.CREATE_PRECEPTORS)
	@Post()
	async create(@Body() preceptor: CreateUserDTO) {
		return await this.preceptorService.createPreceptor(preceptor);
	}

	@PermissionsNeeded(PERMISSIONS.READ_PRECEPTORS)
	@Get()
	async read(@User() user: AuthUser) {
		return await this.preceptorService.findPreceptorsBySchoolId(user.school_id);
	}

	@PermissionsNeeded(PERMISSIONS.DELETE_PRECEPTORS)
	@Delete(':id')
	async delete(@Param('id') id: number) {
		return await this.preceptorService.deletePreceptor(id);
	}
}
