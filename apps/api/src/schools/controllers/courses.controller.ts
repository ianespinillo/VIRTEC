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
import { AuthUser, PERMISSIONS } from '@repo/common';
import type { CreateCourseDTO } from '@repo/common';
import { CoursesService } from '../services/courses.service';

@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@PermissionsNeeded(PERMISSIONS.CREATE_COURSE)
	@Post()
	async create(@User() user: AuthUser, @Body() course: CreateCourseDTO) {
		return this.coursesService.createCourse(course, user.school_id);
	}

	@PermissionsNeeded(PERMISSIONS.READ_COURSES)
	@Get()
	async findAllCourses(@User() user: AuthUser) {
		return this.coursesService.findAllCourses(user.school_id);
	}

	@PermissionsNeeded(PERMISSIONS.READ_COURSES)
	@Get(':id')
	async findCourseById(@Param('id', ParseIntPipe) id: number) {
		return this.coursesService.findCourseById(id);
	}

	@PermissionsNeeded(PERMISSIONS.DELETE_COURSE)
	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number) {
		return this.coursesService.deleteCourse(id);
	}
}
