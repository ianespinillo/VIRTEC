import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { User } from '@/auth/decorators/user.decorator';
import { AuthUser } from '../../../../../packages/types/src/auth/types';
import { PERMISSIONS } from '@repo/common/src/permissions';
import type { CreateUserDTO } from '@/users/dtos/user.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
