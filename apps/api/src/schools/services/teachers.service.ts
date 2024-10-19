import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { Teacher } from '@prisma/client';
import type { CreateTeacherDTO } from '@repo/common';

@Injectable()
export class TeachersService {
	constructor(
		private db: PrismaService,
		private usersService: UsersService,
	) {}

	async create(teacher: CreateTeacherDTO) {
		const tExists = await this.findByFileN(teacher.file_n);
		if (tExists) throw new BadRequestException('Teacher already exists');
		return await this.db.$transaction(async (tx) => {
			const user = await this.usersService.createUser(teacher);
			const { id } = await tx.teacher.create({
				data: {
					user_id: user.id,
					file_n: teacher.file_n,
				},
			});
			return {
				...user,
				teacher_id: id,
			};
		});
	}
	async findByFileN(file_n: string) {
		return await this.db.teacher.findFirst({
			where: { file_n, deleted_at: null },
		});
	}
	findById(id: number): Promise<Teacher | null> {
		return this.db.teacher.findUnique({
			where: {
				id,
				deleted_at: null,
			},
		});
	}

	async findAllTeachersBySchool(school_id: number) {
		return await this.db.teacher.findMany({
			where: {
				user: {
					school_id,
					deleted_at: null,
				},
			},
			select: {
				id: true,
				file_n: true,
				user: {
					select: {
						id: true,
						email: true,
						user_detail: true,
					},
				},
			},
		});
	}
	findBySurname(surname: string) {
		return this.db.teacher.findMany({
			where: {
				user: {
					user_detail: {
						surname: {
							contains: surname,
							mode: 'insensitive',
						},
						deleted_at: null,
					},
				},
			},
			select: {
				id: true,
				file_n: true,
				user: {
					select: {
						id: true,
						email: true,
						user_detail: true,
					},
				},
			},
		});
	}
	async findAllTeachers() {
		return await this.db.teacher.findMany({
			where: {
				deleted_at: null,
			},
			select: {
				id: true,
				file_n: true,
				user: {
					select: {
						id: true,
						email: true,
						user_detail: true,
					},
				},
			},
		});
	}
}
