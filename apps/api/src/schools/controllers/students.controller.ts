import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { User } from '@/auth/decorators/user.decorator';
import { AuthUser } from '../../../../../packages/types/src/auth/types';
import { PERMISSIONS } from '@repo/common/src/permissions';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { CreateStudentDTO } from '../../../../../packages/types/src/schools/create-student.dto';
import { StudentsService } from '../services/students.service';

@Controller('students')
export class StudentsController {
	constructor(private studentService: StudentsService) {}
	@PermissionsNeeded(PERMISSIONS.CREATE_STUDENTS)
	@Post('')
	async createStudent(@Body() student: CreateStudentDTO) {
		return await this.studentService.createStudent(student);
	}

	@PermissionsNeeded(PERMISSIONS.READ_STUDENTS_LIST)
	@Get()
	async getStudents(@User() user: AuthUser) {
		return await this.studentService.findStudentsBySchoolId(user.school_id);
	}

	@PermissionsNeeded(PERMISSIONS.READ_STUDENTS_LIST)
	@Get(':id')
	async getStudent(@Param('id') id: number) {
		return await this.studentService.findStudent(id);
	}
}
