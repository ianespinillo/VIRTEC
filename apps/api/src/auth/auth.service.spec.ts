import { UsersService } from '@/users/users.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';
import { compare } from 'bcryptjs';
import { AuthService } from './auth.service';

const usersServiceMock = {
	findByDni: jest.fn(),
	findByEmail: jest.fn(),
	getUserRole: jest.fn(),
};

const jwtServiceMock = {
	signAsync: jest.fn(),
};

jest.mock('bcryptjs', () => ({
	compare: jest.fn(),
}));

const compareMock = compare as jest.Mock;

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: usersServiceMock,
				},
				{
					provide: JwtService,
					useValue: jwtServiceMock,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	describe('AuthService tests', () => {
		it('should return a token if user with dni exists', () => {
			const user = {
				dni: '12345678',
				password: '12345678',
			};
			usersServiceMock.findByDni.mockResolvedValue({
				user: {
					password: user.password,
					email: 'email',
					id: '12',
				},
				dni: user.dni,
			});
			compareMock.mockResolvedValue(true);
			jwtServiceMock.signAsync.mockResolvedValue('token');
			expect(service.loginWithDni(user)).resolves.toEqual({
				acces_token: 'token',
			});
		});
		it('should return a token if user with email exists', () => {
			const user = {
				email: 'email',
				password: '12345678',
			};
			usersServiceMock.findByEmail.mockResolvedValue({
				user: {
					password: user.password,
					email: user.email,
					id: '12',
				},
				user_detail: {
					dni: '12345678',
				},
			});
			compareMock.mockResolvedValue(true);
			jwtServiceMock.signAsync.mockResolvedValue('token');
			expect(service.loginWithEmail(user)).resolves.toEqual({
				acces_token: 'token',
			});
		});

		it('should throw an error if user with dni does not exist', () => {
			const user = {
				dni: '12345678',
				password: '12345678',
			};
			usersServiceMock.findByDni.mockResolvedValue(null);
			expect(service.loginWithDni(user)).rejects.toThrow(NotFoundException);
		});
		it('should throw an error if user with email does not exist', () => {
			const user = {
				email: 'email',
				password: '12345678',
			};
			usersServiceMock.findByEmail.mockResolvedValue(null);
			expect(service.loginWithEmail(user)).rejects.toThrow(NotFoundException);
		});

		it('should throw an error if password is wrong (email)', () => {
			const user = {
				email: 'email',
				dni: '12345678',
				password: '12345678',
			};
			usersServiceMock.findByEmail.mockResolvedValue(user);
			compareMock.mockResolvedValue(false);
			expect(service.loginWithEmail(user)).rejects.toThrow(UnauthorizedException);
		});

		it('should throw an error if password is wrong (dni)', () => {
			const user = {
				email: 'email',
				dni: '12345678',
				password: '12345678',
			};
			usersServiceMock.findByDni.mockResolvedValue({
				user: {
					password: user.password,
					email: 'email',
					id: '12',
				},
				dni: user.dni,
			});
			compareMock.mockResolvedValue(false);
			expect(service.loginWithDni(user)).rejects.toThrow(UnauthorizedException);
		});
		it('should get role', async () => {
			const role_id = 1;
			usersServiceMock.getUserRole.mockResolvedValue({
				id: 1,
				name: 'admin',
			});
			expect(await service.getRole(role_id)).toEqual({
				id: 1,
				name: 'admin',
			});
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
