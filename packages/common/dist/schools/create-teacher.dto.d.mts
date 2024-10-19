import { CreateUserDTO } from '../users/user.dto.mjs';

declare class CreateTeacherDTO extends CreateUserDTO {
    file_n: string;
}

export { CreateTeacherDTO };
