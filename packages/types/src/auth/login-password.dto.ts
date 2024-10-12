import { IsEmail, MinLength } from 'class-validator';

export class LoginEmailDTO {
	@MinLength(8)
	password: string;

	@MinLength(1)
	@IsEmail({}, { message: 'Email is not valid' })
	email: string;
}
