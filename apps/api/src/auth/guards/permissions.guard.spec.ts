import { UsersService } from '@/users/users.service';
import { createMock } from '@golevelup/ts-jest';
import type { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, type TestingModule } from '@nestjs/testing';
import { PermissionsGuard } from './permissions.guard';

const permissionsRequired = ['read', 'write'];

describe('PermissionsGuard', () => {
	let guard: PermissionsGuard;
	let reflector: Reflector;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PermissionsGuard,
				{
					provide: Reflector,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		}).compile();

		guard = module.get<PermissionsGuard>(PermissionsGuard);

		reflector = module.get<Reflector>(Reflector);
	});

	it('should be defined', () => {
		expect(guard).toBeDefined();
	});

	it('should return true if user has all permissions', async () => {
		// Mock the permissions required by the handler
		reflector.get = jest.fn().mockReturnValue(permissionsRequired);
		const context = createMock<ExecutionContext>();
		context.switchToHttp().getRequest.mockReturnValue({
			user: {
				permissions: ['read', 'write'],
			},
		});

		const result = await guard.canActivate(context);
		expect(result).toBe(true);
	});

	it('should return false if user lacks some permissions', async () => {
		reflector.get = jest.fn().mockReturnValue(['read', 'write']);

		const context = createMock<ExecutionContext>();
		context.switchToHttp().getRequest.mockReturnValue({
			user: {
				permissions: ['read'],
			},
		});

		const result = await guard.canActivate(context);
		expect(result).toBe(false);
	});
});
