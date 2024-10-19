import { AuthModule } from '@/auth/auth.module';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { DbModule } from '@/db/db.module';
import { UsersModule } from '@/users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { CoursesController } from './controllers/courses.controller';
import { PreceptorsController } from './controllers/preceptors.controller';
import { SchoolAdminController } from './controllers/school-admin.controller';
import { SchoolsController } from './controllers/schools.controller';
import { SpeciallityController } from './controllers/speciallity.controller';
import { StudentsController } from './controllers/students.controller';
import { SubjectsController } from './controllers/subjects.controller';
import { CoursesService } from './services/courses.service';
import { PreceptorsService } from './services/preceptors.service';
import { SchoolAdminService } from './services/school-admin.service';
import { SchoolsService } from './services/schools.service';
import { SpeciallityService } from './services/speciallity.service';
import { StudentsService } from './services/students.service';
import { SubjectsService } from './services/subjects.service';
import { TeachersService } from './services/teachers.service';

@Module({
	imports: [
		CloudinaryModule,
		DbModule,
		forwardRef(() => AuthModule),
		forwardRef(() => UsersModule),
	],
	exports: [SchoolsService],
	controllers: [
		SchoolsController,
		SubjectsController,
		StudentsController,
		SpeciallityController,
		PreceptorsController,
		CoursesController,
		SchoolAdminController,
	],
	providers: [
		SchoolsService,
		SpeciallityService,
		SubjectsService,
		StudentsService,
		PreceptorsService,
		CoursesService,
		TeachersService,
		SchoolAdminService,
	],
})
export class SchoolsModule {}
