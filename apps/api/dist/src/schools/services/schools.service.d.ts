import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { PrismaService } from '@/db/prisma.service';
import type { School as PrismaSchool } from '@prisma/client';
import type { School } from '../types';
export declare class SchoolsService {
    private cloudinaryService;
    private db;
    constructor(cloudinaryService: CloudinaryService, db: PrismaService);
    createSchool(school: School): Promise<{
        id: number;
        name: string;
        address: string;
        crest_url: string | null;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
    }>;
    private schoolExists;
    findSchool(id: number): Promise<PrismaSchool | null>;
    findAllSchools(): Promise<PrismaSchool[]>;
    deleteSchool(id: number): Promise<{
        id: number;
        name: string;
        address: string;
        crest_url: string | null;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
    }>;
    updateSchool(id: number, school: Partial<School>): Promise<{
        id: number;
        name: string;
        address: string;
        crest_url: string | null;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
    }>;
}
