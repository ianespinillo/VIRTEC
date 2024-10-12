import { Injectable } from '@nestjs/common';
import { PrismaService } from './db/prisma.service';

@Injectable()
export class AppService {
	constructor(private db: PrismaService) {}
	getHello(): string {
		return 'Hello World!';
	}
}
