import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
	@IsString()
	@IsNotEmpty({
		message: 'Name is mandatory for creating a subject',
	})
	name!: string;

	@IsString()
	@IsNotEmpty({
		message: 'Start time is mandatory for creating a subject',
	})
	start_time!: string;

	@IsString()
	@IsNotEmpty({
		message: 'End time is mandatory for creating a subject',
	})
	end_time!: string;

	@IsString()
	@IsNotEmpty({ message: 'Teacher is mandatory for creating a subject' })
	teacher_id!: number;

	@IsNotEmpty()
	course_id!: number;
}
