import { PrismaService } from '@/db/prisma.service';
import { SchoolsService } from '@/schools/services/schools.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { Course } from '@prisma/client';
import type { CreateCourseDTO } from '@repo/common';
import type { FindCourse } from '../types';
import { PreceptorsService } from './preceptors.service';

@Injectable()
export class CoursesService {
	constructor(
		private db: PrismaService,
		private schoolService: SchoolsService,
		private preceptorsService: PreceptorsService,
	) {}

	async createCourse(course: CreateCourseDTO, school_id: number) {
		const schoolExists = await this.schoolService.findSchool(school_id);
		if (!schoolExists) throw new BadRequestException('School not found');
		const courseExist = await this.findCourse({
			year: course.year,
			division: course.division,
			school_id: school_id,
			speciallity_id: course.speciallity_id,
		});
		if (courseExist) throw new BadRequestException('Course already exists');
		const preceptorExists = await this.preceptorsService.findPreceptorById(
			course.preceptor_id,
		);
		if (!preceptorExists) throw new BadRequestException('Preceptor not found');
		return await this.db.course.create({
			data: {
				year: course.year,
				division: course.division,
				school_id: school_id,
				speciallity_id: course.speciallity_id,
				preceptor_id: course.preceptor_id,
			},
		});
	}
	async findCourse(course: FindCourse) {
		return await this.db.course.findUnique({
			where: {
				unique_year_and_division: {
					year: course.year,
					division: course.division,
					school_id: course.school_id,
					speciallity_id: course.speciallity_id,
				},
			},
		});
	}
	async findCourseById(courseId: number): Promise<Course | null> {
		return await this.db.course.findUnique({
			where: {
				id: courseId,
			},
		});
	}

	async findAllCourses(school_id: number): Promise<Course[]> {
		return await this.db.course.findMany({
			where: {
				school_id,
			},
		});
	}

	async deleteCourse(id: number) {
		return !!(await this.db.course.update({
			where: {
				id,
			},
			data: {
				deleted_at: new Date(),
			},
		}));
	}

	async deleteCourseById(id: number) {
		return !!(await this.db.course.update({
			where: {
				id,
			},
			data: {
				deleted_at: new Date(),
			},
		}));
	}
}
