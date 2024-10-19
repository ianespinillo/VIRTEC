import { DbModule } from '@/db/db.module';
import { SchoolsModule } from '@/schools/schools.module';
import { fakeUserMock } from '@/test-utils/fake-user';
import { Test, type TestingModule } from '@nestjs/testing';
import { SpeciallityService } from '../services/speciallity.service';
import { SpeciallityController } from './speciallity.controller';
const serviceMock = {
	createSpeciallity: jest.fn(),
	findSpeciallity: jest.fn(),
	findAllBySchool: jest.fn(),
	deleteSpeciallity: jest.fn(),
};
describe('SpeciallityController', () => {
	let controller: SpeciallityController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DbModule],
			providers: [
				{
					provide: SpeciallityService,
					useValue: serviceMock,
				},
			],
			controllers: [SpeciallityController],
		}).compile();

		controller = module.get<SpeciallityController>(SpeciallityController);
	});
	describe('SpeciallityController tests', () => {
		it('should create a speciallity', () => {
			serviceMock.createSpeciallity.mockResolvedValue({
				id: 1,
				name: 'speciallity',
				school_id: 1,
			});

			expect(
				controller.createSpeciallity(fakeUserMock, {
					name: 'speciallity',
					school_id: 1,
				}),
			).resolves.toEqual({
				id: 1,
				name: 'speciallity',
				school_id: 1,
			});
		});
		it('should find all actives speciallities by school id', async () => {
			serviceMock.findAllBySchool.mockResolvedValue([
				{
					id: 1,
					name: 'speciallity',
					school_id: 1,
				},
			]);
			expect(await controller.findAll(fakeUserMock)).toEqual([
				{
					id: 1,
					name: 'speciallity',
					school_id: 1,
				},
			]);
		});
		it('should delete a speciallity', () => {
			serviceMock.deleteSpeciallity.mockResolvedValue({
				id: 1,
				name: 'speciallity',
				school_id: 1,
				deleted_at: expect.any(Date),
			});
			expect(controller.deleteSpeciallity(1)).resolves.toEqual({
				id: 1,
				name: 'speciallity',
				school_id: 1,
				deleted_at: expect.any(Date),
			});
		});
	});
	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
