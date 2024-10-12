import { PrismaService } from '@/db/prisma.service';
import { prismaMock } from '@/testing/mock-db';

export const getprismaMockService = () => ({
	provide: PrismaService,
	useValue: prismaMock,
});
