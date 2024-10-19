import { SchoolsService } from '@/schools/services/schools.service';

export const getSchoolServiceMock = () => ({
	provide: SchoolsService,
	useValue: {
		findSchool: jest.fn(),
		createSchool: jest.fn(),
	},
});
