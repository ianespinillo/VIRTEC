import { fakeUserMock } from '@/test-utils/fake-user';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const serviceMock = {
	loginWithDni: jest.fn(),
	loginWithEmail: jest.fn(),
	getRole: jest.fn(),
};
const res = {
	status: jest.fn().mockReturnThis(), // Simula el método status
	json: jest.fn(),
	send: jest.fn(),
	cookie: jest.fn(),
} as unknown as Response;

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			imports: [JwtModule.register({})],
			providers: [{ provide: AuthService, useValue: serviceMock }],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	describe('AuthController tests', () => {
		it('should login with dni', async () => {
			serviceMock.loginWithDni.mockResolvedValue({ token: 'token' });
			const result = await controller.loginDni(
				{
					dni: 'dni',
					password: 'password',
				},
				res as Response,
			);
			expect(result).toEqual({ token: 'token' });
		});

		it('should login with email', async () => {
			serviceMock.loginWithEmail.mockResolvedValue({ token: 'token' });
			const result = await controller.loginEmail(
				{
					email: 'email',
					password: 'password',
				},
				res as Response,
			);
			expect(result).toEqual({ token: 'token' });
		});
		it('should return the user role', async () => {
			serviceMock.getRole.mockResolvedValue({
				id: 1,
				name: 'role',
			});
			const result = await controller.getRoles({
				...fakeUserMock,
				password: 'password',
				is_active: true,
				created_at: expect.any(Date),
				updated_at: expect.any(Date),
				deleted_at: null,
				email: 'email',
			});
			expect(result).toEqual({
				id: 1,
				name: 'role',
			});
		});
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
