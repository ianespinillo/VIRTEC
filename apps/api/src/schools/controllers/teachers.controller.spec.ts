import { DbModule } from '@/db/db.module';
import { fakeUserMock } from '@/test-utils/fake-user';
import { UsersModule } from '@/users/users.module';
import { Test, type TestingModule } from '@nestjs/testing';
import { TeachersController } from '../controllers/teachers.controller';
import { TeachersService } from '../services/teachers.service';

const serviceMock = {
	create: jest.fn(),
	findById: jest.fn(),
	findByFileN: jest.fn(),
	findAllTeachersBySchool: jest.fn(),
	findAllTeachers: jest.fn(),
	findBySurname: jest.fn(),
};

describe('TeachersController', () => {
	let controller: TeachersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TeachersController],
			imports: [DbModule],
			providers: [{ provide: TeachersService, useValue: serviceMock }],
		}).compile();

		controller = module.get<TeachersController>(TeachersController);
	});
	describe('TeachersController tests', () => {
		it('should create a teacher', () => {
			serviceMock.create.mockResolvedValue({
				id: 1,
				email: 'email',
				password: 'password',
				school_id: 1,
				teacher_id: 1,
			});

			expect(
				controller.create(fakeUserMock, {
					email: 'email',
					name: 'name',
					surname: 'surname',
					dni: 'dni',
					address: 'address',
					birthdate: 'birthdate',
					cuil: '23-33445566-9',
					school_id: 1,
					file_n: '1234',
				}),
			).resolves.toEqual({
				id: 1,
				email: 'email',
				password: 'password',
				school_id: 1,
				teacher_id: 1,
			});
		});
		it('should find all active teachers by school', () => {
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
			serviceMock.findAllTeachersBySchool.mockResolvedValue([mock]);
			expect(controller.findAllTeachersBySchool(fakeUserMock)).resolves.toEqual([
				mock,
			]);
		});
		it('should find all active teachers of system', async () => {
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
			serviceMock.findAllTeachers.mockResolvedValue([mock]);
			expect(controller.findAll()).resolves.toEqual([mock]);
		});
	});
	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
