import type { PrismaClient } from '@prisma/client';
import { type DeepMockProxy } from 'jest-mock-extended';
export type Context = {
    prisma: PrismaClient;
};
export type MockContext = {
    prisma: DeepMockProxy<PrismaClient>;
};
export declare const createMockContext: () => MockContext;
