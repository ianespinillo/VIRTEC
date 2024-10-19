import { type AuthUser, type CreateTeacherDTO } from '@repo/common';
import { TeachersService } from '../services/teachers.service';
export declare class TeachersController {
    private teachersService;
    constructor(teachersService: TeachersService);
    create(user: AuthUser, teacher: CreateTeacherDTO): Promise<{
        teacher_id: number;
        id: string;
    }>;
    findAllTeachersBySchool(user: AuthUser): Promise<{
        id: number;
        user: {
            id: string;
            user_detail: {
                id: number;
                name: string;
                address: string;
                created_at: Date;
                deleted_at: Date | null;
                updated_at: Date | null;
                surname: string;
                dni: string;
                birthdate: string;
                cuil: string;
                user_id: string;
            };
            email: string;
        };
        file_n: string;
    }[]>;
    findAll(): Promise<{
        id: number;
        user: {
            id: string;
            user_detail: {
                id: number;
                name: string;
                address: string;
                created_at: Date;
                deleted_at: Date | null;
                updated_at: Date | null;
                surname: string;
                dni: string;
                birthdate: string;
                cuil: string;
                user_id: string;
            };
            email: string;
        };
        file_n: string;
    }[]>;
    findOne(surname: string): Promise<{
        id: number;
        user: {
            id: string;
            user_detail: {
                id: number;
                name: string;
                address: string;
                created_at: Date;
                deleted_at: Date | null;
                updated_at: Date | null;
                surname: string;
                dni: string;
                birthdate: string;
                cuil: string;
                user_id: string;
            };
            email: string;
        };
        file_n: string;
    }[]>;
}
