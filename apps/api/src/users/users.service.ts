import { PasswordAdapter } from '@/config/password-adapter';
import { EmailService } from '@/email/email.service';
import { SchoolsService } from '@/schools/services/schools.service';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO, PASSWORD_LENGTH } from '@repo/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UsersService {
	constructor(
		private db: PrismaService,
		private schoolService: SchoolsService,
		private emailServie: EmailService,
	) {}
	async createUser(user: CreateUserDTO) {
		const userExist =
			(await this.findByEmail(user.email)) || (await this.findByDni(user.dni));
		if (userExist) throw new BadRequestException('User already exists');
		const { hashedPassword } =
			await PasswordAdapter.generateHashedPassword(PASSWORD_LENGTH);
		const school = await this.schoolService.findSchool(user.school_id);
		if (!school) throw new NotFoundException('School not found');
		return await this.db.$transaction(async (tx) => {
			const { id, email } = await tx.user.create({
				data: {
					school_id: user.school_id,
					email: user.email,
					role_id: user.role_id,
					password: hashedPassword,
				},
			});
			await tx.user_detail.create({
				data: {
					dni: user.dni,
					name: user.name,
					surname: user.surname,
					address: user.address,
					birthdate: user.birthdate,
					cuil: user.cuil,
					user_id: id,
				},
			});
			await this.emailServie.sendConfirmationEmail({ id, email });
			return { id };
		});
	}
	async findByEmail(email: string) {
		return await this.db.user.findUnique({
			where: { email },
			select: {
				password: true,
				email: true,
				user_detail: {
					select: {
						dni: true,
					},
				},
				id: true,
			},
		});
	}
	async findByDni(dni: string) {
		return await this.db.user_detail.findFirst({
			where: { dni },
			select: {
				user: {
					select: {
						password: true,
						email: true,
						id: true,
					},
				},
				dni: true,
			},
		});
	}

	async isActiveUser(email: string) {
		return await this.db.user.findUnique({
			where: { email },
			select: {
				is_active: true,
			},
		});
	}
	async findById(id: string) {
		return await this.db.user.findUnique({ where: { id } });
	}
	async getAllUserPermissions(id: string) {
		const p = await this.db.user_permissions.findMany({
			where: {
				user_id: id,
			},
		});
		return p.map((p) => p.name);
	}
	async getUserRole(id: number) {
		return this.db.roles.findFirst({
			where: {
				id,
			},
		});
	}

	async updateUser(id: string, user: CreateUserDTO) {
		return this.db.$transaction(async (tx) => {
			await tx.user.update({
				where: { id },
				data: {
					school_id: user.school_id,
					email: user.email,
				},
			});
			await tx.user_detail.update({
				where: { user_id: id },
				data: {
					dni: user.dni,
					name: user.name,
					surname: user.surname,
					address: user.address,
					birthdate: user.birthdate,
					cuil: user.cuil,
					user_id: id,
				},
			});
			return { id };
		});
	}
}
