import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { DbModule } from './db/db.module';
import { EmailModule } from './email/email.module';
import { SchoolsModule } from './schools/schools.module';

import { UsersModule } from './users/users.module';

@Module({
	imports: [
		DbModule,
		UsersModule,
		AuthModule,
		SchoolsModule,
		EmailModule,
		ConfigModule.forRoot(),
	],
	controllers: [AppController],
	providers: [
		AppService,
		JwtStrategy,
		{
			provide: 'PERMISSIONS_GUARD',
			useValue: PermissionsGuard,
		},
	],
})
export class AppModule {}
