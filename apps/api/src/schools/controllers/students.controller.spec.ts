import { DbModule } from '@/db/db.module';
import { UsersModule } from '@/users/users.module';
import { Test, type TestingModule } from '@nestjs/testing';
import { fakeUserMock } from '../../test-utils/fake-user';
import { StudentsService } from '../services/students.service';
import { StudentsController } from './students.controller';
const student = {
	name: 'Lucas',
	surname: 'González',
	email: 'espinilloian@hotmail.com',
	dni: '33445566',
	cuil: '23-47018575-9',
	address: 'Calle Ficticia 789, Córdoba',
	birthdate: '2005-08-10',
	school_id: 1,
	id_course: 1,
	id_school_period: 1,
	n_legajo: '789101',
	origin_school: 'Escuela Primaria N° 15',
	id_next_course: 2,
	partial_debt: false,
	equivalences: false,
	differenced_circuit: false,
	previa_1_id: '',
	previa_2_id: '',
	name_responsable: 'Marta',
	surname_responsable: 'González',
	cuil_responsable: '20-12345678-6',
	phone_responsable: '+5493512345678',
};
const serviceMock = {
	createStudent: jest.fn(),
	findStudent: jest.fn(),
	findStudentsBySchoolId: jest.fn(),
};
describe('StudentsController', () => {
	let controller: StudentsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [StudentsController],
			imports: [DbModule],
			providers: [{ provide: StudentsService, useValue: serviceMock }],
		}).compile();

		controller = module.get<StudentsController>(StudentsController);
	});
	describe('StudentsController tests', () => {
		it('should create a student', async () => {
			serviceMock.createStudent.mockResolvedValue({ id: 1 });
			const result = await controller.createStudent(student);
			expect(result).toEqual({ id: expect.any(Number) });
		});
		it('should find a student', async () => {
			const resultMock = {
				id: 1,
				file_n: '789101',
				user: {
					id: expect.any(Number),
					email: 'espinilloian@hotmail.com',
					user_detail: {
						dni: '33445566',
						name: 'Lucas',
						surname: 'Gonzalez',
					},
				},
				student_course: {
					course: {
						id: 1,
						year: 7,
						division: 1,
						school_id: 1,
						speciallity_id: 1,
						preceptor_id: 1,
					},
				},
			};
			serviceMock.findStudent.mockResolvedValue(resultMock);
			expect(await controller.getStudent(1)).toEqual(resultMock);
		});

		it('should find students by school', async () => {
			const resultMock = [
				{
					id: 1,
					file_n: '789101',
					user: {
						id: expect.any(Number),
						email: 'espinilloian@hotmail.com',
						user_detail: {
							dni: '33445566',
							name: 'Lucas',
							surname: 'Gonzalez',
						},
					},
					student_course: {
						course: {
							id: 1,
							year: 7,
							division: 1,
							school_id: 1,
							speciallity_id: 1,
							preceptor_id: 1,
						},
					},
				},
			];
			serviceMock.findStudentsBySchoolId.mockResolvedValue(resultMock);
			expect(await controller.getStudents(fakeUserMock)).toEqual(resultMock);
		});
	});
	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
