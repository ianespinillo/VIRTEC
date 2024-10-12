import { DbModule } from '@/db/db.module';
import { EmailModule } from '@/email/email.module';
import { SchoolsModule } from '@/schools/schools.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
	controllers: [],
	imports: [DbModule, SchoolsModule, EmailModule],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
