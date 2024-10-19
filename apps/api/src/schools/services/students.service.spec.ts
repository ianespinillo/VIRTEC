import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import { Test, type TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';

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
const prismaMock = {
	student: {
		create: jest.fn(),
		findUnique: jest.fn(),
		findMany: jest.fn(),
	},
	studentDetail: {
		create: jest.fn(),
	},
	student_info: {
		create: jest.fn(),
		findUnique: jest.fn(),
	},
	student_responsable: {
		create: jest.fn(),
	},
	studentCourse: {
		create: jest.fn(),
	},
	studentCourseDetail: {
		create: jest.fn(),
	},
	$transaction: jest.fn((fn) =>
		fn({
			student: prismaMock.student,
			studentDetail: prismaMock.studentDetail,
			student_responsable: prismaMock.student_responsable,
			studentCourse: prismaMock.studentCourse,
			studentCourseDetail: prismaMock.studentCourseDetail,
		}),
	),
};
const userServiceMock = {
	createUser: jest.fn(),
};

describe('StudentsService', () => {
	let service: StudentsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StudentsService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
				{
					provide: UsersService,
					useValue: userServiceMock,
				},
			],
		}).compile();

		service = module.get<StudentsService>(StudentsService);
	});
	describe('StudentsService test', () => {
		it('should create student', async () => {
			const mockUser = { id: 'user-123' };
			userServiceMock.createUser.mockResolvedValue(mockUser);

			const mockStudent = { id: 'student-456' };
			prismaMock.student.create.mockResolvedValue(mockStudent);

			prismaMock.$transaction.mockImplementation(async (transactionCallback) => {
				return await transactionCallback(prismaMock);
			});
			const result = await service.createStudent(student);

			expect(userServiceMock.createUser).toHaveBeenCalledWith(student);

			expect(prismaMock.student.create).toHaveBeenCalledWith({
				data: {
					user_id: mockUser.id,
					file_n: student.n_legajo,
				},
			});

			expect(prismaMock.studentDetail.create).toHaveBeenCalledWith({
				data: {
					equivalences: student.equivalences,
					has_owes_partial_grade: student.partial_debt,
					is_differenced_circuit: student.differenced_circuit,
					id_next_course: student.id_next_course,
					school_origin: student.origin_school,
					student_id: mockStudent.id,
				},
			});

			expect(prismaMock.student_responsable.create).toHaveBeenCalledWith({
				data: {
					cuil: student.cuil_responsable,
					name: student.name_responsable,
					surname: student.surname_responsable,
					phone: student.phone_responsable,
					student_id: mockStudent.id,
				},
			});

			expect(prismaMock.studentCourse.create).toHaveBeenCalledWith({
				data: {
					course_id: student.id_course,
					schoolYearId: student.id_school_period,
					student_id: mockStudent.id,
				},
			});

			expect(result).toEqual({ id: mockStudent.id });
		});
		it('should find student by id', async () => {
			const mock = {
				id: 1,
				file_n: 'file_n',
				user: {
					id: 1,
					email: 'espinilloian@hotmail.com',
					user_detail: {
						select: {
							dni: '33445566',
							name: 'Lucas',
							surname: 'Gonzalez',
						},
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
			prismaMock.student_info.findUnique.mockResolvedValue(mock);
			expect(await service.findStudent(1)).toEqual(mock);
		});
		it('should find students by school', async () => {
			const mock = [
				{
					id: 1,
					file_n: 'file_n',
					user: {
						id: 1,
						email: 'espinilloian@hotmail.com',
						user_detail: {
							select: {
								dni: '33445566',
								name: 'Lucas',
								surname: 'Gonzalez',
							},
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
			prismaMock.student.findMany.mockResolvedValue(mock);
			expect(await service.findStudentsBySchoolId(1)).toEqual(mock);
		});
	});
	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
