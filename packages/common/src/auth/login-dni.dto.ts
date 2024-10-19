import { Length, MaxLength, MinLength } from 'class-validator';

export class LoginDniDTO {
	@MinLength(8)
	@Length(8, 8, {
		message: 'El DNI debe tener 8 caracteres',
	})
	dni!: string;

	@MinLength(8, {
		message: 'La contraseña debe tener 8 caracteres como minimo',
	})
	password!: string;
}
