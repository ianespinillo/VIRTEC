import { CreateUserDTO } from '../users/user.dto';

import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Length,
	Matches,
} from 'class-validator';

export class CreateStudentDTO extends CreateUserDTO {
	@IsNumber()
	id_course!: number;

	@IsNumber()
	id_school_period!: number;

	@IsString()
	@IsNotEmpty()
	n_legajo!: string;

	@IsString()
	@IsNotEmpty()
	origin_school!: string;

	@IsNumber()
	id_next_course!: number;

	@IsBoolean()
	partial_debt!: boolean;

	@IsBoolean()
	equivalences!: boolean;

	@IsBoolean()
	differenced_circuit!: boolean;

	@IsString()
	@IsOptional()
	previa_1_id?: string;

	@IsString()
	@IsOptional()
	previa_2_id?: string;

	@IsString()
	@IsNotEmpty()
	name_responsable!: string;

	@IsString()
	@IsNotEmpty()
	surname_responsable!: string;

	@IsString()
	cuil_responsable!: string;

	@IsString()
	@Length(10, 15)
	phone_responsable!: string;
}
