import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@repo/common';

@Injectable()
export class SchoolAdminService {
	constructor(
		private userService: UsersService,
		private db: PrismaService,
	) {}

	async create(admin: CreateUserDTO) {
		return this.userService.createUser({
			...admin,
			role_id: 1,
		});
	}
	async findAllActiveAdmins() {
		return this.db.user_roles.findMany({
			where: {
				rol_id: 1,
			},
		});
	}
	async findAdminsBySchool(id: number) {
		return this.db.user_roles.findMany({
			where: {
				rol_id: 1,
				school_id: id,
			},
		});
	}

	async findAdminById(id: string) {
		return this.db.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				email: true,
				school_id: true,
				user_detail: true,
			},
		});
	}

	async deleteAdmin(id: string) {
		return this.db.user.update({
			where: {
				id,
			},
			data: {
				deleted_at: new Date(),
			},
		});
	}

	async updateAdmin(id: string, admin: CreateUserDTO) {
		return this.userService.updateUser(id, admin);
	}
}
