import type { PrismaClient } from '@prisma/client';
import { type DeepMockProxy, mockDeep } from 'jest-mock-extended';

export type Context = {
	prisma: PrismaClient;
};

export type MockContext = {
	prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
	return {
		prisma: mockDeep<PrismaClient>(),
	};
};
