import { CreateUserDTO } from '../users/user.dto.js';

declare class CreateTeacherDTO extends CreateUserDTO {
    file_n: string;
}

export { CreateTeacherDTO };
