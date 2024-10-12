import { CreateUserDTO } from '@/users/dtos/user.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateTeacherDTO extends CreateUserDTO {
	@IsNotEmpty()
	file_n: string;
}
