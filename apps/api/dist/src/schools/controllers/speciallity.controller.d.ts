import { type AuthUser, type CreateSpeciallityDTO } from '@repo/common';
import { SpeciallityService } from '../services/speciallity.service';
export declare class SpeciallityController {
    private speciallityService;
    constructor(speciallityService: SpeciallityService);
    createSpeciallity(user: AuthUser, speciallity: CreateSpeciallityDTO): Promise<{
        id: number;
        name: string;
        created_at: Date;
        deleted_at: Date | null;
        updated_at: Date | null;
        school_id: number;
    }>;
    findAll(user: AuthUser): Promise<{
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
