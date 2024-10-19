import { AuthUser } from '@repo/common';
import type { CreateCourseDTO } from '@repo/common';
import { CoursesService } from '../services/courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(user: AuthUser, course: CreateCourseDTO): Promise<{
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
    findAllCourses(user: AuthUser): Promise<{
        id: number;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        school_id: number;
        year: number;
        division: number;
        speciallity_id: number;
        preceptor_id: number;
    }[]>;
    findCourseById(id: number): Promise<{
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
    delete(id: number): Promise<boolean>;
}
