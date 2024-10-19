import { IsNotEmpty } from 'class-validator';
import { CreateUserDTO } from '../users/user.dto';

export class CreateTeacherDTO extends CreateUserDTO {
	@IsNotEmpty()
	file_n!: string;
}
