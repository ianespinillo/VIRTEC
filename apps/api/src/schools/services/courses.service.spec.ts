import { PrismaService } from '@/db/prisma.service';
import { SchoolsService } from '@/schools/services/schools.service';
import { fakeUserMock } from '@/test-utils/fake-user';
import { BadRequestException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { PreceptorsService } from './preceptors.service';

const prismaMock = {
	course: {
		findUnique: jest.fn(),
		create: jest.fn(),
		findFirst: jest.fn(),
		findMany: jest.fn(),
		update: jest.fn(),
	},
};

const schoolServiceMock = {
	findSchool: jest.fn(),
};

const preceptorsServiceMock = {
	findPreceptorById: jest.fn(),
};

const course = {
	year: 2022,
	division: 1,
	school_id: 1,
	speciallity_id: 1,
	preceptor_id: 1,
};

describe('CoursesService', () => {
	let service: CoursesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CoursesService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
				{
					provide: SchoolsService,
					useValue: schoolServiceMock,
				},
				{
					provide: PreceptorsService,
					useValue: preceptorsServiceMock,
				},
			],
		}).compile();

		service = module.get<CoursesService>(CoursesService);
	});

	describe('Course service tests', () => {
		it('should create a course', async () => {
			schoolServiceMock.findSchool.mockResolvedValue({
				id: 1,
				name: 'school',
				address: 'address',
				crest_url: 'some url',
			});
			prismaMock.course.findUnique.mockResolvedValue(null);
			preceptorsServiceMock.findPreceptorById.mockResolvedValue({
				id: 1,
				name: 'preceptor',
				avatar_url: 'some url',
			});
			prismaMock.course.create.mockResolvedValue({
				...course,
				id: 1,
			});

			expect(await service.createCourse(course, fakeUserMock.school_id)).toEqual({
				...course,
				id: 1,
			});
		});
		it('should find a course by unique year and division', () => {
			prismaMock.course.findUnique.mockResolvedValue({
				...course,
				id: 1,
			});

			expect(
				service.findCourse({
					year: course.year,
					division: course.division,
					school_id: course.school_id,
					speciallity_id: course.speciallity_id,
				}),
			).resolves.toEqual({
				...course,
				id: 1,
			});
		});

		it('should find a course by id', () => {
			prismaMock.course.findUnique.mockResolvedValue({
				...course,
				id: 1,
			});

			expect(service.findCourseById(1)).resolves.toEqual({
				...course,
				id: 1,
			});
		});
		it('should throw an error if the school does not exist', () => {
			schoolServiceMock.findSchool.mockResolvedValue(null);

			expect(service.createCourse(course, fakeUserMock.school_id)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw an error if the preceptor does not exist', () => {
			preceptorsServiceMock.findPreceptorById.mockResolvedValue(null);
			expect(service.createCourse(course, fakeUserMock.school_id)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw an error if the course already exists', async () => {
			prismaMock.course.findUnique.mockResolvedValue({ ...course, id: 1 });
			expect(service.createCourse(course, fakeUserMock.school_id)).rejects.toThrow(
				BadRequestException,
			);
		});
		it('should find all courses by school', async () => {
			prismaMock.course.findMany.mockResolvedValue([course]);
			expect(await service.findAllCourses(1)).toEqual([course]);
		});
		it('should delete a course', () => {
			prismaMock.course.update.mockResolvedValue({
				...course,
				deleted_at: expect.any(Date),
			});
			expect(service.deleteCourse(1)).resolves.toBe(true);
		});
		it('should find a course', async () => {
			prismaMock.course.findUnique.mockResolvedValue({ ...course, id: 1 });
			expect(await service.findCourse(course)).toEqual({ ...course, id: 1 });
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
