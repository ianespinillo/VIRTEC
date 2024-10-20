import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { User } from '@/auth/decorators/user.decorator';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import {
	type AuthUser,
	type CreateSpeciallityDTO,
	PERMISSIONS,
} from '@repo/common';
import { SpeciallityService } from '../services/speciallity.service';

@Controller('speciallity')
export class SpeciallityController {
	constructor(private speciallityService: SpeciallityService) {}

	@PermissionsNeeded(PERMISSIONS.CREATE_SPECIALLITY)
	@Post()
	async createSpeciallity(
		@User() user: AuthUser,
		@Body() speciallity: CreateSpeciallityDTO,
	) {
		return await this.speciallityService.createSpeciallity(speciallity);
	}

	@PermissionsNeeded(PERMISSIONS.READ_SPECIALLITIES)
	@Get()
	async findAll(@User() user: AuthUser) {
		return await this.speciallityService.findAllBySchool(user.school_id);
	}

	@PermissionsNeeded(PERMISSIONS.DELETE_SPECIALLITY)
	@Delete(':id')
	async deleteSpeciallity(@Param('id', ParseIntPipe) id: number) {
		return await this.speciallityService.deleteSpeciallity(id);
	}
}
