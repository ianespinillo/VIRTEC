import {
	IsEmail,
	IsNumber,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { IsValidCuil } from '../pipes/validate-cuil/validate-cuil.pipe';

export class CreateUserDTO {
	@IsString()
	@IsEmail()
	email!: string;

	@IsNumber()
	school_id!: number;

	@IsString()
	name!: string;

	@IsString()
	surname!: string;

	@IsString()
	@MinLength(1)
	@MaxLength(8)
	dni!: string;

	@IsString()
	address!: string;

	@IsString()
	birthdate!: string;

	@IsString()
	@IsValidCuil('cuil', {
		message: 'Please enter a valid CUIL',
	})
	cuil!: string;

	@IsNumber()
	role_id?: number;
}
