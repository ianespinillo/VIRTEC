import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolDTO {
	@IsString()
	@IsNotEmpty()
	address: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	/* @IsNotEmpty() */
	crest: Express.Multer.File;
}
