import { DbModule } from '@/db/db.module';
import { UsersModule } from '@/users/users.module';
import { Test, type TestingModule } from '@nestjs/testing';
import { fakeUserMock } from '../../test-utils/fake-user';
import { PreceptorsService } from '../services/preceptors.service';
import { PreceptorsController } from './preceptors.controller';

const fakeUser = {
	email: 'lucas.gonzalez@example.com',
	school_id: 123,
	name: 'Lucas',
	surname: 'Gonzalez',
	dni: '33445566', // 8 caracteres
	address: 'Calle Falsa 123, Córdoba',
	birthdate: '2005-08-10', // Fecha en formato YYYY-MM-DD
	cuil: '23-33445566-9', // Formato CUIL válido
	file_n: '1234',
};

const serviceMock = {
	createPreceptor: jest.fn(),
	findPreceptorById: jest.fn(),
	findPreceptorsBySchoolId: jest.fn(),
	deletePreceptor: jest.fn(),
};

describe('PreceptorsController', () => {
	let controller: PreceptorsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PreceptorsController],
			imports: [DbModule],
			providers: [{ provide: PreceptorsService, useValue: serviceMock }],
		}).compile();

		controller = module.get<PreceptorsController>(PreceptorsController);
	});

	describe('PreceptorsController tests', () => {
		it('should create a preceptor', () => {
			serviceMock.createPreceptor.mockResolvedValue({
				id: 1,
				user_id: '1',
			});

			expect(controller.create(fakeUser)).resolves.toEqual({
				id: 1,
				user_id: '1',
			});
		});
		it('should return a preceptors list', async () => {
			serviceMock.findPreceptorsBySchoolId.mockResolvedValue([
				{
					id: 1,
					user_id: '1',
				},
			]);
			expect(await controller.read(fakeUserMock)).toEqual([
				{
					id: 1,
					user_id: '1',
				},
			]);
		});
		it('should delete a preceptor', async () => {
			serviceMock.deletePreceptor.mockResolvedValue(true);
			expect(await controller.delete(1)).toBe(true);
		});
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
