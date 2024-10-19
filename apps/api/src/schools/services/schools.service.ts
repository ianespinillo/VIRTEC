import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { PrismaService } from '@/db/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { School as PrismaSchool } from '@prisma/client';
import type { School } from '../types';
@Injectable()
export class SchoolsService {
	constructor(
		private cloudinaryService: CloudinaryService,
		private db: PrismaService,
	) {}

	async createSchool(school: School) {
		const schoolExists = await this.schoolExists(school);
		if (schoolExists) throw new BadRequestException('School already exists');
		const url = await this.cloudinaryService.uploadFile(school.crest);
		if (!url) throw new BadRequestException('Error uploading file');
		return await this.db.school.create({
			data: {
				name: school.name,
				address: school.address,
				crest_url: url,
			},
		});
	}
	private async schoolExists(school: School): Promise<boolean> {
		const schoolExists = await this.db.school.findFirst({
			where: {
				name: school.name,
				address: school.address,
			},
		});
		return !!schoolExists;
	}
	async findSchool(id: number): Promise<PrismaSchool | null> {
		return await this.db.school.findUnique({
			where: {
				id,
			},
		});
	}

	async findAllSchools(): Promise<PrismaSchool[]> {
		return await this.db.school.findMany({
			where: {
				deleted_at: null,
			},
		});
	}

	async deleteSchool(id: number) {
		return await this.db.school.update({
			where: {
				id,
			},
			data: {
				deleted_at: new Date(),
			},
		});
	}
	async updateSchool(id: number, school: Partial<School>) {
		const oldSchool = await this.findSchool(id);
		if (oldSchool.crest_url) {
			await this.cloudinaryService.deleteFile(oldSchool.crest_url);
		}
		const url = await this.cloudinaryService.uploadFile(school.crest);
		if (!url) throw new BadRequestException('Error uploading file');
		return await this.db.school.update({
			where: {
				id,
			},
			data: {
				name: school.name,
				address: school.address,
				crest_url: url,
				updated_at: new Date(),
			},
		});
	}
}
