import { CreateUserDTO } from '@repo/common';
import { SchoolAdminService } from '../services/school-admin.service';
export declare class SchoolAdminController {
    private schoolAdminService;
    constructor(schoolAdminService: SchoolAdminService);
    createSchoolAdmin(body: CreateUserDTO): Promise<{
        id: string;
    }>;
    getSchoolAdmins(): Promise<{
        id: string;
        email: string;
        school_id: number;
        rol_id: number;
        rol_name: string;
        school_name: string;
    }[]>;
    getSchoolAdmin(id: string): Promise<{
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
    getSchoolAdminsBySchool(id: number): Promise<{
        id: string;
        email: string;
        school_id: number;
        rol_id: number;
        rol_name: string;
        school_name: string;
    }[]>;
    deleteSchoolAdmin(id: string): Promise<{
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
    updateSchoolAdmin(id: string, body: CreateUserDTO): Promise<{
        id: string;
    }>;
}
