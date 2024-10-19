import { SchoolsService } from '@/schools/services/schools.service';
import { type CreateSchoolDTO } from '@repo/common';
export declare class SchoolsController {
    private schoolsService;
    constructor(schoolsService: SchoolsService);
    create(body: CreateSchoolDTO, crest: Express.Multer.File): Promise<{
        id: number;
        name: string;
        address: string;
        crest_url: string | null;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        address: string;
        crest_url: string | null;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        address: string;
        crest_url: string | null;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        address: string;
        crest_url: string | null;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
    }>;
    update(id: number, body: CreateSchoolDTO, crest: Express.Multer.File): Promise<{
        id: number;
        name: string;
        address: string;
        crest_url: string | null;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
    }>;
}
