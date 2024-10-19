import { type AuthUser, type CreateStudentDTO } from '@repo/common';
import { StudentsService } from '../services/students.service';
export declare class StudentsController {
    private studentService;
    constructor(studentService: StudentsService);
    createStudent(student: CreateStudentDTO): Promise<{
        id: number;
    }>;
    getStudents(user: AuthUser): Promise<{
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
    getStudent(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        surname: string;
        dni: string;
        year: number;
        division: number;
        file_n: string;
    }>;
}
