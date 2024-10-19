import { type AuthUser, type CreateUserDTO } from '@repo/common';
import { PreceptorsService } from '../services/preceptors.service';
export declare class PreceptorsController {
    private preceptorService;
    constructor(preceptorService: PreceptorsService);
    create(preceptor: CreateUserDTO): Promise<{
        preceptor_id: number;
        id: string;
    }>;
    read(user: AuthUser): Promise<{
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
    delete(id: number): Promise<boolean>;
}
