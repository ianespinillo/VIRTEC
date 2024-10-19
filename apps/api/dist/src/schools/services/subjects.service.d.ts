import { PrismaService } from '@/db/prisma.service';
import type { CreateSubjectDto } from '@repo/common';
import type { Subject } from '../types';
import { CoursesService } from './courses.service';
import { TeachersService } from './teachers.service';
export declare class SubjectsService {
    private db;
    private coursesService;
    private teacherService;
    constructor(db: PrismaService, coursesService: CoursesService, teacherService: TeachersService);
    createSubject(subject: CreateSubjectDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        course_id: number;
        teacher_id: number;
        start_time: string;
        end_time: string;
    }>;
    findSubject(subject: Subject): Promise<{
        id: number;
        name: string;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        course_id: number;
        teacher_id: number;
        start_time: string;
        end_time: string;
    }>;
    findAllBySchool(school_id: number): Promise<{
        id: number;
        course: {
            id: number;
            created_at: Date;
            deleted_at: Date | null;
            updated_at: Date | null;
            school_id: number;
            year: number;
            division: number;
            speciallity_id: number;
            preceptor_id: number;
        };
        teacher: {
            id: number;
            created_at: Date;
            deleted_at: Date | null;
            updated_at: Date | null;
            user_id: string;
            file_n: string;
        };
        name: string;
        start_time: string;
        end_time: string;
    }[]>;
}
