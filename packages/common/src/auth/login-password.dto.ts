import { IsEmail, MinLength } from 'class-validator';

export class LoginEmailDTO {
	@MinLength(8, {
		message: 'La contraseña debe tener 8 caracteres como minimo',
	})
	password!: string;

	@MinLength(1)
	@IsEmail({}, { message: 'Email con formato incorrecto' })
	email!: string;
}
