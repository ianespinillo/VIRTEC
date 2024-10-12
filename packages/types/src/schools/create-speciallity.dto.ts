import { IsNotEmpty } from 'class-validator';

export class CreateSpeciallityDTO {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	school_id: number;
}
