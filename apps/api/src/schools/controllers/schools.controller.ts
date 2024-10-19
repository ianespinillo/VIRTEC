import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { SchoolsService } from '@/schools/services/schools.service';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { type CreateSchoolDTO, PERMISSIONS } from '@repo/common';
import { Express } from 'express';

@Controller('schools')
export class SchoolsController {
	constructor(private schoolsService: SchoolsService) {}

	@PermissionsNeeded(PERMISSIONS.CREATE_SCHOOLS)
	@Post()
	@UseInterceptors(FileInterceptor('crest'))
	async create(
		@Body() body: CreateSchoolDTO,
		@UploadedFile() crest: Express.Multer.File,
	) {
		return await this.schoolsService.createSchool({
			...body,
			crest,
		});
	}

	@PermissionsNeeded(PERMISSIONS.READ_SCHOOLS_LIST)
	@Get()
	async findAll() {
		return await this.schoolsService.findAllSchools();
	}

	@PermissionsNeeded(PERMISSIONS.READ_SCHOOLS_LIST)
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return await this.schoolsService.findSchool(id);
	}
	@PermissionsNeeded(PERMISSIONS.DELETE_SCHOOLS)
	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number) {
		return await this.schoolsService.deleteSchool(id);
	}

	@PermissionsNeeded(PERMISSIONS.UPDATE_SCHOOLS)
	@Put(':id')
	@UseInterceptors(FileInterceptor('crest'))
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: CreateSchoolDTO,
		@UploadedFile() crest: Express.Multer.File,
	) {
		return await this.schoolsService.updateSchool(id, {
			...body,
			crest,
		});
	}
}
