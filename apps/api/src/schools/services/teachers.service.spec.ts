import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import { BadRequestException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';

const prismaMock = {
	teacher: {
		create: jest.fn(),
		findFirst: jest.fn(),
		findUnique: jest.fn(),
		findMany: jest.fn(),
	},
	$transaction: jest.fn(),
};

const userMock = {
	createUser: jest.fn(),
};

const fakeUser = {
	email: 'lucas.gonzalez@example.com',
	school_id: 123,
	name: 'Lucas',
	surname: 'González',
	dni: '33445566', // 8 caracteres
	address: 'Calle Falsa 123, Córdoba',
	birthdate: '2005-08-10', // Fecha en formato YYYY-MM-DD
	cuil: '23-33445566-9', // Formato CUIL válido
	file_n: '1234',
};

describe('TeachersService', () => {
	let service: TeachersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TeachersService,
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

		service = module.get<TeachersService>(TeachersService);
	});
	describe('Teachers service tests', () => {
		it('should create a teacher', async () => {
			prismaMock.teacher.findFirst.mockResolvedValue(null);
			prismaMock.teacher.findUnique.mockResolvedValue(null);
			prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
			userMock.createUser.mockResolvedValue({
				id: '1',
				email: fakeUser.email,
				password: 'password',
				school_id: fakeUser.school_id,
			});
			prismaMock.teacher.create.mockResolvedValue({
				id: 1,
				file_n: 'file_n',
				user_id: 1,
			});

			const teacher = await service.create(fakeUser);
			expect(prismaMock.$transaction).toHaveBeenCalled();
			expect(teacher).toEqual({
				id: '1',
				email: fakeUser.email,
				password: 'password',
				school_id: fakeUser.school_id,
				teacher_id: 1,
			});
		});

		it('should throw exception if teacher already exists', async () => {
			prismaMock.teacher.findFirst.mockResolvedValue({
				id: 1,
				file_n: 'file_n',
				user_id: 1,
			});
			await expect(service.create(fakeUser)).rejects.toThrow(BadRequestException);
		});
		it('should find a teacher by file number', () => {
			prismaMock.teacher.findUnique.mockResolvedValue({
				id: 1,
				file_n: 'file_n',
				user_id: 1,
			});
			expect(service.findByFileN('file_n')).resolves.toEqual({
				id: 1,
				file_n: 'file_n',
				user_id: 1,
			});
		});

		it('should find a teacher by id', () => {
			prismaMock.teacher.findUnique.mockResolvedValue({
				id: 1,
				file_n: 'file_n',
				user_id: 1,
			});
			expect(service.findById(1)).resolves.toEqual({
				id: 1,
				file_n: 'file_n',
				user_id: 1,
			});
		});
		it('should find a teachers by school', async () => {
			const mock = {
				id: 1,
				file_n: 'file_n',
				user: {
					id: '1',
					email: 'lucas.gonzalez@example.com',
					user_detail: {
						name: 'Lucas',
						surname: 'Gonzalez',
						address: 'Calle Falsa 123, Córdoba',
						birthdate: '2005-08-10',
						dni: '33445566',
						cuil: '23-33445566-9',
					},
				},
			};
			prismaMock.teacher.findMany.mockResolvedValue([mock]);
			expect(service.findAllTeachersBySchool(1)).resolves.toEqual([mock]);
		});
	});
	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
