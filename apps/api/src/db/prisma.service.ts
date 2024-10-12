import { PASSWORD_LENGTH } from '@/common/constants';
import { PERMISSIONS } from '@repo/common/src/permissions';
import { ROLES } from '@repo/common/src/roles';
import { PasswordAdapter } from '@/config/password-adapter';
import { Injectable, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { prismaMock } from '@/testing/mock-db';
import { courses } from '../../prisma/fixtures/courses';
import { role_permission } from '../../prisma/fixtures/permission';
import { fakeSchool } from '../../prisma/fixtures/schools';
import { adminFake, preceptorFake } from '../../prisma/fixtures/users';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async seed() {
		const permissions = Object.entries(PERMISSIONS);
		const rolesArr = Object.entries(ROLES);
		for (const role of rolesArr) {
			await this.roles.create({
				data: {
					name: role[1],
				},
			});
		}
		for (const permission of permissions) {
			await this.permission.create({
				data: {
					name: permission[1],
				},
			});
		}
		for (const { id_permission, id_rol } of role_permission) {
			await this.permissionRole.create({
				data: {
					permission_id: id_permission,
					role_id: id_rol,
				},
			});
		}
		const school = await this.school.create({
			data: fakeSchool,
		});
		await this.schoolPeriod.create({
			data: {
				name: 'Primer Periodo',
			},
		});
		const preceptorPassword =
			await PasswordAdapter.generateHashedPassword(PASSWORD_LENGTH);
		const preceptor = await this.user.create({
			data: {
				email: preceptorFake.email,
				password: preceptorPassword.hashedPassword,
				school_id: school.id,
				user_detail: {
					create: preceptorFake.user_detail,
				},
				user_role: {
					create: {
						rol_id: 5,
					},
				},
			},
		});
		const preceptor_info = await this.preceptor.create({
			data: {
				user_id: preceptor.id,
			},
		});
		const category = await this.speciallity.create({
			data: {
				name: 'Prueba',
				school_id: school.id,
			},
		});
		for (const course of courses) {
			await this.course.create({
				data: {
					division: course.division,
					year: course.year,
					speciallity_id: category.id,
					school_id: school.id,
					preceptor_id: preceptor_info.id,
				},
			});
		}

		const { hashedPassword, password } =
			await PasswordAdapter.generateHashedPassword(PASSWORD_LENGTH);
		await this.user.create({
			data: {
				email: adminFake.email,
				password: hashedPassword,
				school_id: school.id,
				user_detail: {
					create: adminFake.user_detail,
				},
			},
		});
		console.log('Password: ', password);
	}
	async resetDatabase() {
		await this.$connect();
		await this.$executeRaw`TRUNCATE TABLE 
  "Student", 
  "Attendance", 
  "Category", 
  "Course", 
  "withdrawDetail", 
  "School", 
  "Speciallity", 
  "Tool", 
  "Subject", 
  "Grade", 
  "Storeroom", 
  "Storeman", 
  "Preceptor", 
  "Teacher", 
  "Withdraw", 
  "measurementType", 
  "useType", 
  "User", 
  "userDetail", 
  "Roles", 
  "userRole", 
  "studentCourse", 
  "SchoolPeriod", 
  "studentDetail", 
  "studentResponsable", 
  "Permission", 
  "PermissionRole" 
RESTART IDENTITY CASCADE`;

		await this.$disconnect();
		return 'Database reset successfully';
	}
}
