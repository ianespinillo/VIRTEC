import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PrismaService } from './db/prisma.service';
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');
	// Configura CORS
	app.enableCors({
		origin: 'http://localhost:3000', // Permite solicitudes desde este origen específico
		methods: 'GET, HEAD, PUT, PATCH, POST, DELETE', // Métodos permitidos
		allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
		credentials: true, // Necesita cookies para funcionar correctamente
	});
	app.use(cookieParser());
	await app.listen(3001);
	const isSeedMode = Boolean(process.env.SEED_MODE);
	if (isSeedMode) {
		await app.get(PrismaService).seed();
	}
}
bootstrap();
