import { PrismaService } from '@/db/prisma.service';
import { SchoolsService } from '@/schools/services/schools.service';
import { getprismaMockService } from '@/test-utils/prisma.mock';
import { Test, type TestingModule } from '@nestjs/testing';
import { SpeciallityService } from './speciallity.service';

const schoolService = {
	findSchool: jest.fn(),
};
const prismaMock = {
	speciallity: {
		create: jest.fn(),
		findUnique: jest.fn(),
	},
};
describe('SpeciallityService', () => {
	let service: SpeciallityService;
	let db: PrismaService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SpeciallityService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
				{
					provide: SchoolsService,
					useValue: schoolService,
				},
			],
		}).compile();
		service = module.get<SpeciallityService>(SpeciallityService);
	});
	describe('SpeciallityService tests', () => {
		it('should create a speciallity', () => {
			const speciallity = {
				name: 'speciallity',
				school_id: 1,
			};
			schoolService.findSchool.mockResolvedValue({
				id: 1,
				name: 'school',
				address: 'address',
				crest_url: 'some url',
			});
			prismaMock.speciallity.create.mockResolvedValue({
				id: 1,
				name: 'speciallity',
				school_id: 1,
			});
			expect(service.createSpeciallity(speciallity)).resolves.toEqual({
				id: 1,
				name: 'speciallity',
				school_id: 1,
			});
		});

		it('should find a speciallity', () => {
			prismaMock.speciallity.findUnique.mockResolvedValue({
				id: 1,
				name: 'speciallity',
				school_id: 1,
			});
			expect(service.findSpeciallity(1)).resolves.toEqual({
				id: 1,
				name: 'speciallity',
				school_id: 1,
			});
		});
	});
	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
