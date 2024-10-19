import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import type { CreateUserDTO } from '@repo/common';
export declare class PreceptorsService {
    private db;
    private usersService;
    constructor(db: PrismaService, usersService: UsersService);
    createPreceptor(preceptor: CreateUserDTO): Promise<{
        preceptor_id: number;
        id: string;
    }>;
    findPreceptorById(id: number): Promise<{
        id: number;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        user_id: string;
    }>;
    findPreceptorsBySchoolId(school_id: number): Promise<{
        id: number;
        course: {
            year: number;
            division: number;
        }[];
        user: {
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
        };
    }[]>;
    deletePreceptor(id: number): Promise<boolean>;
}
