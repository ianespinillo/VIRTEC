import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { User } from '@/auth/decorators/user.decorator';
import { AuthUser } from '../../../../../packages/types/src/auth/types';
import { PERMISSIONS } from '@repo/common/src/permissions';
import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateSubjectDto } from '../../../../../packages/types/src/schools/create-subject.dto';
import { SubjectsService } from '../services/subjects.service';

@Controller('subjects')
export class SubjectsController {
	constructor(private subjectsService: SubjectsService) {}

	@PermissionsNeeded(PERMISSIONS.CREATE_SUBJECT)
	@Post()
	async create(@Body() subject: CreateSubjectDto) {
		return await this.subjectsService.createSubject(subject);
	}

	@PermissionsNeeded(PERMISSIONS.READ_SUBJECTS)
	@Get()
	async findAll(@User() user: AuthUser) {
		return await this.subjectsService.findAllBySchool(user.school_id);
	}
}
