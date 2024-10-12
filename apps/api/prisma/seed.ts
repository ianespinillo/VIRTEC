import { PASSWORD_LENGTH } from '@/common/constants';
import { PERMISSIONS } from '@repo/common/src/permissions';
import { ROLES } from '@repo/common/src/roles';
import { PasswordAdapter } from '@/config/password-adapter';

import { prisma } from '@/lib/db';
import { courses } from './fixtures/courses';
import { role_permission } from './fixtures/permission';
import { fakeSchool } from './fixtures/schools';
import { adminFake, preceptorFake } from './fixtures/users';

async function main() {
	const permissions = Object.entries(PERMISSIONS);
	const rolesArr = Object.entries(ROLES);
	for (const role of rolesArr) {
		await prisma.roles.create({
			data: {
				name: role[1],
			},
		});
	}
	for (const permission of permissions) {
		await prisma.permission.create({
			data: {
				name: permission[1],
			},
		});
	}
	for (const { id_permission, id_rol } of role_permission) {
		await prisma.permissionRole.create({
			data: {
				permission_id: id_permission,
				role_id: id_rol,
			},
		});
	}
	const school = await prisma.school.create({
		data: fakeSchool,
	});
	const preceptorPassword =
		await PasswordAdapter.generateHashedPassword(PASSWORD_LENGTH);
	const preceptor = await prisma.user.create({
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
	const preceptor_info = await prisma.preceptor.create({
		data: {
			user_id: preceptor.id,
		},
	});
	const category = await prisma.speciallity.create({
		data: {
			name: 'Prueba',
			school_id: school.id,
		},
	});
	for (const course of courses) {
		await prisma.course.create({
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
	await prisma.user.create({
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

main()
	.then(async () => {
		console.log('DB Seeded');
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
