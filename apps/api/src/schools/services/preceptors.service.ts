import { PrismaService } from '@/db/prisma.service';
import type { CreateUserDTO } from '@/users/dtos/user.dto';
import { UsersService } from '@/users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PreceptorsService {
	constructor(
		private db: PrismaService,
		private usersService: UsersService,
	) {}
	async createPreceptor(preceptor: CreateUserDTO) {
		const pExist =
			(await this.usersService.findByDni(preceptor.dni)) ||
			(await this.usersService.findByEmail(preceptor.email));
		if (pExist) throw new BadRequestException('Preceptor already exists');
		return await this.db.$transaction(async (tx) => {
			const user = await this.usersService.createUser(preceptor);
			const { id } = await tx.preceptor.create({
				data: {
					user_id: user.id,
				},
			});
			return {
				...user,
				preceptor_id: id,
			};
		});
	}

	async findPreceptorById(id: number) {
		return await this.db.preceptor.findUnique({
			where: {
				id,
			},
		});
	}
	async findPreceptorsBySchoolId(school_id: number) {
		return await this.db.preceptor.findMany({
			where: {
				user: {
					school_id,
				},
			},
			select: {
				course: {
					select: {
						year: true,
						division: true,
					},
				},
				id: true,
				user: {
					select: {
						user_detail: true,
					},
				},
			},
		});
	}

	async deletePreceptor(id: number) {
		return !!(await this.db.preceptor.update({
			where: {
				id,
			},
			data: {
				deleted_at: new Date(),
			},
		}));
	}
}
