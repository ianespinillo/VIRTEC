import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import type { Teacher } from '@prisma/client';
import type { CreateTeacherDTO } from '@repo/common';
export declare class TeachersService {
    private db;
    private usersService;
    constructor(db: PrismaService, usersService: UsersService);
    create(teacher: CreateTeacherDTO): Promise<{
        teacher_id: number;
        id: string;
    }>;
    findByFileN(file_n: string): Promise<{
        id: number;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        user_id: string;
        file_n: string;
    }>;
    findById(id: number): Promise<Teacher | null>;
    findAllTeachersBySchool(school_id: number): Promise<{
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
    findBySurname(surname: string): import("@prisma/client").Prisma.PrismaPromise<{
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
    findAllTeachers(): Promise<{
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
