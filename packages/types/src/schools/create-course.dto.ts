import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseDTO {
	@IsNotEmpty()
	@IsNumber()
	year: number;

	@IsNotEmpty()
	@IsNumber()
	division: number;

	@IsNotEmpty()
	@IsNumber()
	speciallity_id: number;

	@IsNotEmpty()
	@IsNumber()
	preceptor_id: number;
}
