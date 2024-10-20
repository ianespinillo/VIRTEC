import type { PrismaClient } from '@prisma/client';
import { type DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import { prisma } from '@/lib/db';

jest.mock('@/lib/db', () => ({
	prisma: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
	mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
