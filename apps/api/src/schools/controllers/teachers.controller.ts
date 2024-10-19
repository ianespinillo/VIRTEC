import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { User } from '@/auth/decorators/user.decorator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
	type AuthUser,
	type CreateTeacherDTO,
	PERMISSIONS,
} from '@repo/common';
import { TeachersService } from '../services/teachers.service';

@Controller('teachers')
export class TeachersController {
	constructor(private teachersService: TeachersService) {}

	@PermissionsNeeded(PERMISSIONS.CREATE_TEACHERS)
	@Post()
	async create(@User() user: AuthUser, @Body() teacher: CreateTeacherDTO) {
		return await this.teachersService.create(teacher);
	}

	@PermissionsNeeded(PERMISSIONS.READ_TEACHERS)
	@Get()
	async findAllTeachersBySchool(@User() user: AuthUser) {
		return await this.teachersService.findAllTeachersBySchool(user.school_id);
	}

	@PermissionsNeeded(PERMISSIONS.READ_TEACHERS)
	@Get()
	async findAll() {
		return await this.teachersService.findAllTeachers();
	}

	@PermissionsNeeded(PERMISSIONS.READ_TEACHERS)
	@Get(':surname')
	async findOne(@Param('surname') surname: string) {
		return await this.teachersService.findBySurname(surname);
	}
}
