import { PrismaService } from '@/db/prisma.service';
import { EmailService } from '@/email/email.service';
import { SchoolsService } from '@/schools/services/schools.service';
import { Test, type TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

const prismaMock = {
	user: {
		findFirst: jest.fn(),
		create: jest.fn(),
		findUnique: jest.fn(),
	},
	user_detail: {
		create: jest.fn(),
		findFirst: jest.fn(),
	},
	$transaction: jest.fn((fn) =>
		fn({
			user: prismaMock.user,
			user_detail: prismaMock.user_detail,
		}),
	),
	user_permissions: {
		findMany: jest.fn(),
	},
};

const schoolMock = {
	findSchool: jest.fn(),
};
const emailServiceMock = {
	sendConfirmationEmail: jest.fn(),
};

describe('UsersService', () => {
	let usersService: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
				{
					provide: SchoolsService,
					useValue: schoolMock,
				},
				{
					provide: EmailService,
					useValue: emailServiceMock,
				},
			],
		}).compile();
		usersService = module.get<UsersService>(UsersService);
	});
	describe('Users service tests', () => {
		it('should create a user', async () => {
			prismaMock.user.findUnique.mockResolvedValue(null);
			prismaMock.user_detail.findFirst.mockResolvedValue(null);
			schoolMock.findSchool.mockResolvedValue({
				id: 1,
				name: 'school',
				address: 'address',
				crest_url: 'some url',
			});
			prismaMock.user.create.mockResolvedValue({
				id: '12',
				email: 'email',
				password: expect.any(String),
				school_id: 1,
			});
			prismaMock.user_detail.create.mockResolvedValue({
				id: 1,
				dni: 'dni',
				name: 'name',
				surname: 'surname',
				address: 'address',
				birthdate: 'birthdate',
				cuil: 'cuil',
				user_id: '12',
			});
			emailServiceMock.sendConfirmationEmail.mockResolvedValue({});
			const user = await usersService.createUser({
				email: 'email',
				name: 'name',
				surname: 'surname',
				dni: 'dni',
				birthdate: 'birthdate',
				cuil: 'cuil',
				address: 'address',
				school_id: 1,
			});
			expect(user).toEqual({
				id: '12',
			});
			expect(prismaMock.$transaction).toHaveBeenCalled();
			expect(prismaMock.user.create).toHaveBeenCalled();
			expect(prismaMock.user_detail.create).toHaveBeenCalled();
			expect(emailServiceMock.sendConfirmationEmail).toHaveBeenCalled();
			expect(schoolMock.findSchool).toHaveBeenCalled();
			expect(emailServiceMock.sendConfirmationEmail).toHaveBeenCalledWith({
				id: '12',
				email: 'email',
			});
		});

		it('should find user by email', async () => {
			prismaMock.user.findUnique.mockResolvedValue({
				id: '12',
				email: 'email',
				password: expect.any(String),
				school_id: 1,
			});
			const user = await usersService.findByEmail('email');
			expect(user).toEqual({
				id: '12',
				email: 'email',
				password: expect.any(String),
				school_id: 1,
			});
			expect(prismaMock.user.findUnique).toHaveBeenCalled();
		});

		it('should find user by dni', async () => {
			prismaMock.user_detail.findFirst.mockResolvedValue({
				id: 1,
				dni: 'dni',
				name: 'name',
				surname: 'surname',
				address: 'address',
				birthdate: 'birthdate',
				cuil: 'cuil',
				user_id: '12',
			});
			const user = await usersService.findByDni('dni');
			expect(user).toEqual({
				id: 1,
				dni: 'dni',
				name: 'name',
				surname: 'surname',
				address: 'address',
				birthdate: 'birthdate',
				cuil: 'cuil',
				user_id: '12',
			});
			expect(prismaMock.user_detail.findFirst).toHaveBeenCalled();
		});
		it('should return user status', async () => {
			prismaMock.user.findUnique.mockResolvedValue({
				id: '12',
				email: 'email',
				password: expect.any(String),
				school_id: 1,
				is_active: true,
			});
			const user = await usersService.isActiveUser('email');
			expect(user).toEqual({
				id: '12',
				email: 'email',
				password: expect.any(String),
				school_id: 1,
				is_active: true,
			});
			expect(prismaMock.user.findUnique).toHaveBeenCalled();
		});
		it('should find a user by id', async () => {
			prismaMock.user.findUnique.mockResolvedValue({
				id: '12',
				email: 'email',
				password: expect.any(String),
				school_id: 1,
			});
			const user = await usersService.findById('12');
			expect(user).toEqual({
				id: '12',
				email: 'email',
				password: expect.any(String),
				school_id: 1,
			});
			expect(prismaMock.user.findUnique).toHaveBeenCalled();
		});

		it('should return users permissions', async () => {
			prismaMock.user_permissions.findMany.mockResolvedValue([
				{
					name: 'CREATE_USER',
					user_id: '12',
				},
			]);
			const user = await usersService.getAllUserPermissions('12');
			expect(user).toEqual(['CREATE_USER']);
			expect(prismaMock.user_permissions.findMany).toHaveBeenCalled();
		});
	});
	it('should be defined', () => {
		expect(usersService).toBeDefined();
	});
});
