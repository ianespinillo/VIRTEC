import { DbModule } from '@/db/db.module';

import { SchoolsModule } from '@/schools/schools.module';
import { fakeUserMock } from '@/test-utils/fake-user';
import { Test, type TestingModule } from '@nestjs/testing';
import { CoursesService } from '../services/courses.service';
import { CoursesController } from './courses.controller';

const serviceMock = {
	findCourse: jest.fn(),
	findAllCourses: jest.fn(),
	findCourseById: jest.fn(),
	createCourse: jest.fn(),
	deleteCourse: jest.fn(),
};

const course = {
	year: 7,
	division: 1,
	school_id: 1,
	speciallity_id: 1,
	preceptor_id: 1,
};

describe('CoursesController', () => {
	let controller: CoursesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CoursesController],
			imports: [DbModule],
			providers: [
				{
					provide: CoursesService,
					useValue: serviceMock,
				},
			],
		}).compile();

		controller = module.get<CoursesController>(CoursesController);
	});

	describe('CoursesController tests', () => {
		it('should create a course', async () => {
			serviceMock.createCourse.mockResolvedValue({
				...course,
				id: 1,
				created_at: expect.any(Date),
			});
			const result = await controller.create(fakeUserMock, course);
			expect(result).toEqual({
				...course,
				id: 1,
				created_at: expect.any(Date),
			});
		});
		it('should find a course', () => {
			serviceMock.findCourseById.mockResolvedValue(course);
			expect(controller.findCourseById(1)).resolves.toEqual(course);
		});
		it('should find all courses', () => {
			serviceMock.findAllCourses.mockResolvedValue([course]);
			expect(controller.findAllCourses(fakeUserMock)).resolves.toEqual([course]);
		});
		it('should delete a course', () => {
			serviceMock.deleteCourse.mockResolvedValue({
				...course,
				id: 1,
				deleted_at: expect.any(Date),
			});
			expect(controller.delete(1)).resolves.toEqual({
				...course,
				id: 1,
				deleted_at: expect.any(Date),
			});
		});
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
