import { EmailService } from '@/email/email.service';
import { SchoolsService } from '@/schools/services/schools.service';
import { CreateUserDTO } from '@repo/common';
import { PrismaService } from '../db/prisma.service';
export declare class UsersService {
    private db;
    private schoolService;
    private emailServie;
    constructor(db: PrismaService, schoolService: SchoolsService, emailServie: EmailService);
    createUser(user: CreateUserDTO): Promise<{
        id: string;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        password: string;
        user_detail: {
            dni: string;
        };
        email: string;
    }>;
    findByDni(dni: string): Promise<{
        user: {
            id: string;
            password: string;
            email: string;
        };
        dni: string;
    }>;
    isActiveUser(email: string): Promise<{
        is_active: boolean;
    }>;
    findById(id: string): Promise<{
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
    getAllUserPermissions(id: string): Promise<string[]>;
    getUserRole(id: number): Promise<{
        id: number;
        name: string;
    }>;
    updateUser(id: string, user: CreateUserDTO): Promise<{
        id: string;
    }>;
}
