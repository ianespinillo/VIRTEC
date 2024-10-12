import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const serviceMock = {
	loginWithDni: jest.fn(),
	loginWithEmail: jest.fn(),
};

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
			const result = await controller.loginDni({
				dni: 'dni',
				password: 'password',
			});
			expect(result).toEqual({ token: 'token' });
		});

		it('should login with email', async () => {
			serviceMock.loginWithEmail.mockResolvedValue({ token: 'token' });
			const result = await controller.loginEmail({
				email: 'email',
				password: 'password',
			});
			expect(result).toEqual({ token: 'token' });
		});
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
