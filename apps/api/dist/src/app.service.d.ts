import { PrismaService } from './db/prisma.service';
export declare class AppService {
    private db;
    constructor(db: PrismaService);
    getHello(): string;
}
