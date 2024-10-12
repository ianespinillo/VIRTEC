import { Test, type TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
//import { prismaMock } from '@/testing/mock-db';

import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import {
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';

const prismaMock = {
	school: {
		findFirst: jest.fn(),
		create: jest.fn(),
		findUnique: jest.fn(),
		findMany: jest.fn(),
		update: jest.fn(),
	},
};

const cloudinaryService = {
	uploadFile: jest.fn().mockResolvedValue('some url'),
};

const school = {
	id: 1,
	name: 'school',
	address: 'address',
	crest_url: 'some url',
};
describe('SchoolsService', () => {
	let service: SchoolsService;

	beforeEach(async () => {
		jest.clearAllMocks();
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SchoolsService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
				{
					provide: CloudinaryService,
					useValue: cloudinaryService,
				},
			],
		}).compile();
		service = module.get<SchoolsService>(SchoolsService);
	});
	describe('school service tests', () => {
		it('should find a school', async () => {
			prismaMock.school.findUnique.mockResolvedValue(school);
			const url = await service.findSchool(1);
			expect(url).toBe(school);
		});
		it('should create a school', async () => {
			prismaMock.school.findFirst.mockResolvedValue(null);
			prismaMock.school.create.mockResolvedValue(school);

			const url = await service.createSchool({
				name: 'school',
				address: 'address',
				crest: expect.any(File),
			});
			expect(url).toBe(school);
		});
		it('should throw an error if the crest is not provided or fails to upload', async () => {
			cloudinaryService.uploadFile.mockRejectedValue(
				new InternalServerErrorException('Error uploading file'),
			);
			expect(
				service.createSchool({
					name: 'school',
					address: 'address',
					crest: expect.any(File),
				}),
			).rejects.toThrow(InternalServerErrorException);
		});
		it('should throw an error if the school already exists', async () => {
			prismaMock.school.findFirst.mockResolvedValue(school);
			expect(
				service.createSchool({
					name: 'school',
					address: 'address',
					crest: expect.any(File),
				}),
			).rejects.toThrow(BadRequestException);
		});
		it('should find all schools', async () => {
			prismaMock.school.findMany.mockResolvedValue([school]);
			const result = await service.findAllSchools();
			expect(result).toEqual([school]);
		});

		it('should delete a school', async () => {
			prismaMock.school.update.mockResolvedValue({
				...school,
				deleted_at: expect.any(Date),
			});
			const result = await service.deleteSchool(1);
			expect(result).toEqual({
				...school,
				deleted_at: expect.any(Date),
			});
		});
		it('should find a school', async () => {
			prismaMock.school.findUnique.mockResolvedValue(school);
			const result = await service.findSchool(1);
			expect(result).toEqual(school);
		});
	});
	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
