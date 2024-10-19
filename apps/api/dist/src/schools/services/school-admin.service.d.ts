import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import { CreateUserDTO } from '@repo/common';
export declare class SchoolAdminService {
    private userService;
    private db;
    constructor(userService: UsersService, db: PrismaService);
    create(admin: CreateUserDTO): Promise<{
        id: string;
    }>;
    findAllActiveAdmins(): Promise<{
        id: string;
        email: string;
        school_id: number;
        rol_id: number;
        rol_name: string;
        school_name: string;
    }[]>;
    findAdminsBySchool(id: number): Promise<{
        id: string;
        email: string;
        school_id: number;
        rol_id: number;
        rol_name: string;
        school_name: string;
    }[]>;
    findAdminById(id: string): Promise<{
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
        school_id: number;
    }>;
    deleteAdmin(id: string): Promise<{
        id: string;
        password: string;
        role_id: number;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        email: string;
        is_active: boolean;
        school_id: number;
    }>;
    updateAdmin(id: string, admin: CreateUserDTO): Promise<{
        id: string;
    }>;
}
