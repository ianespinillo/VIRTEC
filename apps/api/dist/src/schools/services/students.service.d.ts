import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import type { CreateStudentDTO } from '@repo/common/';
export declare class StudentsService {
    private usersService;
    private db;
    constructor(usersService: UsersService, db: PrismaService);
    createStudent(student: CreateStudentDTO): Promise<{
        id: number;
    }>;
    findStudent(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        surname: string;
        dni: string;
        year: number;
        division: number;
        file_n: string;
    }>;
    findStudentsBySchoolId(school_id: number): Promise<{
        id: number;
        user: {
            id: string;
            email: string;
        };
        student_course: {
            course: {
                id: number;
                created_at: Date;
                deleted_at: Date | null;
                updated_at: Date | null;
                school_id: number;
                year: number;
                division: number;
                speciallity_id: number;
                preceptor_id: number;
            };
        }[];
        file_n: string;
    }[]>;
}
