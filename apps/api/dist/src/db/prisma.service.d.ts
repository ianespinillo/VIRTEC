import { type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
    resetDatabase(): Promise<string>;
}
