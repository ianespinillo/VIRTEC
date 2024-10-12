import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import { BadRequestException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { PreceptorsService } from './preceptors.service';

const prismaMock = {
	preceptor: {
		create: jest.fn(),
		findFirst: jest.fn(),
		findUnique: jest.fn(),
		update: jest.fn(),
		findMany: jest.fn(),
	},
	$transaction: jest.fn(),
};

const userMock = {
	createUser: jest.fn(),

	findByDni: jest.fn(),
	findByEmail: jest.fn(),
};

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
describe('PreceptorsService', () => {
	let service: PreceptorsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PreceptorsService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
				{
					provide: UsersService,
					useValue: userMock,
				},
			],
		}).compile();

		service = module.get<PreceptorsService>(PreceptorsService);
	});

	describe('Preceptor service tests', () => {
		it('should create a preceptor', async () => {
			userMock.findByDni.mockResolvedValue(null);
			userMock.findByEmail.mockResolvedValue(null);
			userMock.createUser.mockResolvedValue({
				id: '1',
				email: fakeUser.email,
				password: 'password',
				school_id: fakeUser.school_id,
			});
			prismaMock.preceptor.create.mockResolvedValue({
				id: 1,
				user_id: 1,
			});

			prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
			const preceptor = await service.createPreceptor(fakeUser);
			expect(prismaMock.$transaction).toHaveBeenCalled();
			expect(prismaMock.preceptor.create).toHaveBeenCalled();
			expect(preceptor).toEqual({
				id: '1',
				email: fakeUser.email,
				password: 'password',
				school_id: fakeUser.school_id,
				preceptor_id: 1,
			});
		});

		it('should throw exception if the dni of the preceptor already exists', async () => {
			userMock.findByDni.mockResolvedValue({
				id: '1',
				email: fakeUser.email,
				password: 'password',
				school_id: fakeUser.school_id,
			});
			expect(service.createPreceptor(fakeUser)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw exception if the email of the preceptor already exists', async () => {
			userMock.findByEmail.mockResolvedValue({
				id: '1',
				email: fakeUser.email,
				password: 'password',
				school_id: fakeUser.school_id,
			});
			expect(service.createPreceptor(fakeUser)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should find a preceptor by id', async () => {
			prismaMock.preceptor.findUnique.mockResolvedValue({
				id: 1,
				user_id: '1',
			});
			expect(await service.findPreceptorById(1)).toEqual({
				id: 1,
				user_id: '1',
			});
		});
		it('should find preceptors by school id', async () => {
			prismaMock.preceptor.findMany.mockResolvedValue([fakeUser]);
			expect(await service.findPreceptorsBySchoolId(1)).toEqual([fakeUser]);
		});
		it('should delete a preceptor by id', async () => {
			prismaMock.preceptor.update.mockResolvedValue({
				id: 1,
				user_id: '1',
				deleted_at: expect.any(Date),
			});
			expect(await service.deletePreceptor(1)).toBe(true);
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
