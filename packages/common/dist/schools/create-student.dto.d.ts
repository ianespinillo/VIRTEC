import { CreateUserDTO } from '../users/user.dto.js';

declare class CreateStudentDTO extends CreateUserDTO {
    id_course: number;
    id_school_period: number;
    n_legajo: string;
    origin_school: string;
    id_next_course: number;
    partial_debt: boolean;
    equivalences: boolean;
    differenced_circuit: boolean;
    previa_1_id?: string;
    previa_2_id?: string;
    name_responsable: string;
    surname_responsable: string;
    cuil_responsable: string;
    phone_responsable: string;
}

export { CreateStudentDTO };
