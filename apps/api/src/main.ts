import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './db/prisma.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');
	await app.listen(3000);
	const isSeedMode = Boolean(process.env.SEED_MODE);
	if (isSeedMode) {
		await app.get(PrismaService).seed();
	}
}
bootstrap();
