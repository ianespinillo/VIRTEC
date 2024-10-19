import { PrismaService } from '@/db/prisma.service';
import { SchoolsService } from '@/schools/services/schools.service';
import type { Course } from '@prisma/client';
import type { CreateCourseDTO } from '@repo/common';
import type { FindCourse } from '../types';
import { PreceptorsService } from './preceptors.service';
export declare class CoursesService {
    private db;
    private schoolService;
    private preceptorsService;
    constructor(db: PrismaService, schoolService: SchoolsService, preceptorsService: PreceptorsService);
    createCourse(course: CreateCourseDTO, school_id: number): Promise<{
        id: number;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        school_id: number;
        year: number;
        division: number;
        speciallity_id: number;
        preceptor_id: number;
    }>;
    findCourse(course: FindCourse): Promise<{
        id: number;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        school_id: number;
        year: number;
        division: number;
        speciallity_id: number;
        preceptor_id: number;
    }>;
    findCourseById(courseId: number): Promise<Course | null>;
    findAllCourses(school_id: number): Promise<Course[]>;
    deleteCourse(id: number): Promise<boolean>;
    deleteCourseById(id: number): Promise<boolean>;
}
