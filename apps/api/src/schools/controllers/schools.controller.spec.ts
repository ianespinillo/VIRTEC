import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { DbModule } from '@/db/db.module';
import { Test, type TestingModule } from '@nestjs/testing';
import { fakeUserMock } from '../../test-utils/fake-user';
import { SchoolsService } from '../services/schools.service';
import { SchoolsController } from './schools.controller';

const schoolService = {
	createSchool: jest.fn(),
	findAllSchools: jest.fn(),
	deleteSchool: jest.fn(),
	findSchool: jest.fn(),
};

const school = {
	id: 1,
	name: 'school',
	address: 'address',
	crest_url: 'some url',
};
const crest = {
	buffer: Buffer.from('mock file content'),
	originalname: 'crest.png',
	mimetype: 'image/png',
	size: 1024,
} as Express.Multer.File;

describe('SchoolsController', () => {
	let controller: SchoolsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SchoolsController],
			imports: [CloudinaryModule, DbModule],
			providers: [
				{
					provide: SchoolsService,
					useValue: schoolService,
				},
			],
		}).compile();

		controller = module.get<SchoolsController>(SchoolsController);
	});
	it('should create school', async () => {
		const body = {
			name: 'school',
			address: 'address',
			crest: expect.any(File),
		};

		schoolService.createSchool.mockResolvedValue({
			id: 1,
			name: 'school',
			address: 'address',
			crest_url: 'some url',
		});
		const result = await controller.create(body, crest);

		expect(result).toEqual({
			id: 1,
			name: 'school',
			address: 'address',
			crest_url: 'some url',
		});
	});
	it('should return a school list', async () => {
		schoolService.findAllSchools.mockResolvedValue([
			{
				id: 1,
				name: 'school',
				address: 'address',
				crest_url: 'some url',
			},
		]);
		const result = await controller.findAll();
		expect(result).toEqual([school]);
	});

	it('should return a school', async () => {
		schoolService.findSchool.mockResolvedValue(school);
		const result = await controller.findOne(1);
		expect(result).toEqual(school);
	});
	it('should delete a school', async () => {
		schoolService.deleteSchool.mockResolvedValue({
			...school,
			deleted_at: expect.any(Date),
		});
		const result = await controller.delete(1);
		expect(result).toEqual({
			...school,
			deleted_at: expect.any(Date),
		});
	});
	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
