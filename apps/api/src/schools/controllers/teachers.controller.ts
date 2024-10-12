import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { User } from '@/auth/decorators/user.decorator';
import { AuthUser } from '../../../../../packages/types/src/auth/types';
import { PERMISSIONS } from '@repo/common/src/permissions';
import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import type { CreateTeacherDTO } from '../../../../../packages/types/src/schools/create-teacher.dto';
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
