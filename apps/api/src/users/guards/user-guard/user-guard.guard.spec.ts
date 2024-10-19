import { UsersService } from '@/users/users.service';
import { BadRequestException, type ExecutionContext } from '@nestjs/common';
// user.guard.spec.ts
import { Test, type TestingModule } from '@nestjs/testing';
import { UserGuard } from './user.guard';

describe('UserGuard', () => {
	let guard: UserGuard;
	let usersService: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserGuard,
				{
					provide: UsersService,
					useValue: {
						isActiveUser: jest.fn(),
					},
				},
			],
		}).compile();

		guard = module.get<UserGuard>(UserGuard);
		usersService = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(guard).toBeDefined();
	});

	it('should throw BadRequestException if user is not found in request', async () => {
		const context = createMockExecutionContextWithoutUser();

		// Intentamos activar el guard sin el usuario en la solicitud
		await expect(guard.canActivate(context)).rejects.toThrow(BadRequestException);
		await expect(guard.canActivate(context)).rejects.toThrow('User not found');
	});

	it('should throw BadRequestException if user is not active', async () => {
		const context = createMockExecutionContextWithUser();

		// Configuramos el mock para que devuelva un usuario inactivo
		jest
			.spyOn(usersService, 'isActiveUser')
			.mockResolvedValue({ is_active: false });

		await expect(guard.canActivate(context)).rejects.toThrow(BadRequestException);
		await expect(guard.canActivate(context)).rejects.toThrow('User not active');
	});

	it('should return true if user is active', async () => {
		const context = createMockExecutionContextWithUser();

		// Configuramos el mock para que devuelva un usuario activo
		jest
			.spyOn(usersService, 'isActiveUser')
			.mockResolvedValue({ is_active: true });

		const result = await guard.canActivate(context);
		expect(result).toBe(true);
	});
});

// Función auxiliar para crear un ExecutionContext simulado sin usuario
function createMockExecutionContextWithoutUser(): ExecutionContext {
	return {
		switchToHttp: () => ({
			getRequest: () => ({
				body: {}, // No incluimos el usuario aquí para simular el caso de usuario no encontrado
			}),
		}),
	} as unknown as ExecutionContext;
}

// Función auxiliar para crear un ExecutionContext simulado con usuario
function createMockExecutionContextWithUser(): ExecutionContext {
	return {
		switchToHttp: () => ({
			getRequest: () => ({
				body: {
					user: {
						email: 'test@example.com',
					},
				},
			}),
		}),
	} as unknown as ExecutionContext;
}
