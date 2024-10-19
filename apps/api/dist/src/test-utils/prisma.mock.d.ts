import { PrismaService } from '@/db/prisma.service';
export declare const getprismaMockService: () => {
    provide: typeof PrismaService;
    useValue: import("jest-mock-extended").DeepMockProxy<import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>>;
};
