import { type AuthUser, type CreateSubjectDto } from '@repo/common';
import { SubjectsService } from '../services/subjects.service';
export declare class SubjectsController {
    private subjectsService;
    constructor(subjectsService: SubjectsService);
    create(subject: CreateSubjectDto): Promise<{
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
    findAll(user: AuthUser): Promise<{
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
