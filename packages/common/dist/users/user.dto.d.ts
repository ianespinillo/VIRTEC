declare class CreateUserDTO {
    email: string;
    school_id: number;
    name: string;
    surname: string;
    dni: string;
    address: string;
    birthdate: string;
    cuil: string;
    role_id?: number;
}

export { CreateUserDTO };
