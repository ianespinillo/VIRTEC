import { PrismaService } from '@/db/prisma.service';
import { SchoolsService } from '@/schools/services/schools.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateSpeciallityDTO } from '@repo/common/';

@Injectable()
export class SpeciallityService {
	constructor(
		private schoolService: SchoolsService,
		private db: PrismaService,
	) {}

	async createSpeciallity(speciallity: CreateSpeciallityDTO) {
		const school = await this.schoolService.findSchool(speciallity.school_id);
		if (!school)
			throw new BadRequestException(
				`Could not find school ${speciallity.school_id}`,
			);
		return await this.db.speciallity.create({
			data: {
				name: speciallity.name,
				school_id: speciallity.school_id,
			},
		});
	}
	async findSpeciallity(id: number) {
		return await this.db.speciallity.findUnique({
			where: {
				id,
			},
		});
	}

	async findAllBySchool(school_id: number) {
		return await this.db.speciallity.findMany({
			where: {
				school_id,
				deleted_at: null,
			},
		});
	}

	async deleteSpeciallity(id: number) {
		return await this.db.speciallity.update({
			where: {
				id,
			},
			data: {
				deleted_at: new Date(),
			},
		});
	}
}
