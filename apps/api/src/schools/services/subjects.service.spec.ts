import { PrismaService } from '@/db/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { SubjectsService } from './subjects.service';
import { TeachersService } from './teachers.service';

const prismaMock = {
	subject: {
		findUnique: jest.fn(),
		findMany: jest.fn(),
		create: jest.fn(),
	},
};

const coursesServiceMock = {
	findCourseById: jest.fn(),
};

const teachersServiceMock = {
	findById: jest.fn(),
};

const subject = {
	name: 'subject',
	start_time: '10:00',
	end_time: '11:00',
	teacher_id: 1,
	course_id: 1,
};

describe('SubjectsService', () => {
	let service: SubjectsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SubjectsService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
				{
					provide: CoursesService,
					useValue: coursesServiceMock,
				},
				{
					provide: TeachersService,
					useValue: teachersServiceMock,
				},
			],
		}).compile();

		service = module.get<SubjectsService>(SubjectsService);
	});
	describe('subject service tests', () => {
		it('should create a subject', async () => {
			coursesServiceMock.findCourseById.mockResolvedValue({
				id: 1,
				school_id: 1,
				year: 1,
				division: 1,
				speciallity_id: 1,
				preceptor_id: 1,
			});

			teachersServiceMock.findById.mockResolvedValue({
				id: 1,
				file_n: '12',
				user_id: 1,
			});

			prismaMock.subject.findUnique.mockResolvedValue(null);

			prismaMock.subject.create.mockResolvedValue({
				id: 1,
				name: 'subject',
				start_time: '10:00',
				end_time: '11:00',
				teacher_id: 1,
				course_id: 1,
			});

			const result = await service.createSubject(subject);
			expect(result).toEqual({
				id: 1,
				...subject,
			});
		});

		it('should find a subject', async () => {
			prismaMock.subject.findUnique.mockResolvedValue({
				id: 1,
				name: 'subject',
				start_time: '10:00',
				end_time: '11:00',
				teacher_id: 1,
				course_id: 1,
			});

			const result = await service.findSubject(subject);
			expect(result).toEqual({
				id: 1,
				...subject,
			});
		});
		it('should throw an error if the course does not exist', () => {
			coursesServiceMock.findCourseById.mockResolvedValue(null);
			expect(service.createSubject(subject)).rejects.toThrow(BadRequestException);
		});

		it('should throw an error if the teacher does not exist', () => {
			coursesServiceMock.findCourseById.mockResolvedValue({
				id: 1,
				school_id: 1,
				year: 1,
				division: 1,
				speciallity_id: 1,
				preceptor_id: 1,
			});
			teachersServiceMock.findById.mockResolvedValue(null);
			expect(service.createSubject(subject)).rejects.toThrow(BadRequestException);
		});

		it('should throw an error if the subject already exists', () => {
			prismaMock.subject.findUnique.mockResolvedValue({
				id: 1,
				name: 'subject',
				start_time: '10:00',
				end_time: '11:00',
				teacher_id: 1,
				course_id: 1,
			});
			expect(service.createSubject(subject)).rejects.toThrow(BadRequestException);
		});
		it('should find all subjects by school_id', async () => {
			prismaMock.subject.findMany.mockResolvedValue([
				{
					...subject,
					id: 1,
					course: {
						id: 1,
						school_id: 1,
						year: 1,
						division: 1,
						speciallity_id: 1,
						preceptor_id: 1,
					},
					teacher: {
						id: 1,
						file_n: '12',
						user_id: 1,
					},
				},
			]);
			const result = await service.findAllBySchool(1);
			expect(result).toEqual([
				{
					...subject,
					id: 1,
					course: {
						id: 1,
						school_id: 1,
						year: 1,
						division: 1,
						speciallity_id: 1,
						preceptor_id: 1,
					},
					teacher: {
						id: 1,
						file_n: '12',
						user_id: 1,
					},
				},
			]);
		});
	});
	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
