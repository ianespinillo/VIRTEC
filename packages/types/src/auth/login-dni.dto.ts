import { MaxLength, MinLength } from 'class-validator';

export class LoginDniDTO {
	@MaxLength(8)
	dni: string;

	@MinLength(8)
	password: string;
}
