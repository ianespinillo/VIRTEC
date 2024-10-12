import { PrismaService } from '@/db/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateSubjectDto } from '../../../../../packages/types/src/schools/create-subject.dto';
import type { Subject } from '../types';
import { CoursesService } from './courses.service';
import { TeachersService } from './teachers.service';

@Injectable()
export class SubjectsService {
	constructor(
		private db: PrismaService,
		private coursesService: CoursesService,
		private teacherService: TeachersService,
	) {}

	async createSubject(subject: CreateSubjectDto) {
		const { name, start_time, end_time, teacher_id, course_id } = subject;
		const course = await this.coursesService.findCourseById(course_id);
		if (!course) {
			throw new BadRequestException('School not found');
		}
		const teacher = await this.teacherService.findById(teacher_id);
		if (!teacher) {
			throw new BadRequestException('Teacher not found');
		}
		const subjectExists = await this.findSubject(subject);
		if (subjectExists) {
			throw new BadRequestException('Subject already exists');
		}
		return await this.db.subject.create({
			data: {
				name,
				start_time,
				end_time,
				course_id,
				teacher_id,
			},
		});
	}

	async findSubject(subject: Subject) {
		return await this.db.subject.findUnique({
			where: {
				unique_subject: {
					name: subject.name,
					start_time: subject.start_time,
					end_time: subject.end_time,
					course_id: subject.course_id,
				},
			},
		});
	}

	async findAllBySchool(school_id: number) {
		return await this.db.subject.findMany({
			where: {
				course: {
					school_id,
				},
				deleted_at: null,
			},
			select: {
				id: true,
				name: true,
				start_time: true,
				end_time: true,
				course: true,
				teacher: true,
			},
		});
	}
}
