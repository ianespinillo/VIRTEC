import { PrismaService } from '@/db/prisma.service';
import { SchoolsService } from '@/schools/services/schools.service';
import type { CreateSpeciallityDTO } from '@repo/common/';
export declare class SpeciallityService {
    private schoolService;
    private db;
    constructor(schoolService: SchoolsService, db: PrismaService);
    createSpeciallity(speciallity: CreateSpeciallityDTO): Promise<{
        id: number;
        name: string;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        school_id: number;
    }>;
    findSpeciallity(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        school_id: number;
    }>;
    findAllBySchool(school_id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        school_id: number;
    }[]>;
    deleteSpeciallity(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        school_id: number;
    }>;
}
