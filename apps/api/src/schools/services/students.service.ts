import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import type { CreateStudentDTO } from '@repo/common/';

@Injectable()
export class StudentsService {
	constructor(
		private usersService: UsersService,
		private db: PrismaService,
	) {}
	async createStudent(student: CreateStudentDTO) {
		return await this.db.$transaction(async (tx) => {
			const user = await this.usersService.createUser(student);
			const { id } = await tx.student.create({
				data: {
					user_id: user.id,
					file_n: student.n_legajo,
				},
			});
			await tx.studentDetail.create({
				data: {
					equivalences: student.equivalences,
					has_owes_partial_grade: student.partial_debt,
					is_differenced_circuit: student.differenced_circuit,
					id_next_course: student.id_next_course,
					school_origin: student.origin_school,
					student_id: id,
				},
			});
			await tx.student_responsable.create({
				data: {
					cuil: student.cuil_responsable,
					name: student.name_responsable,
					surname: student.surname_responsable,
					phone: student.phone_responsable,
					student_id: id,
				},
			});
			await tx.studentCourse.create({
				data: {
					course_id: student.id_course,
					schoolYearId: student.id_school_period,
					student_id: id,
				},
			});
			return { id };
		});
	}
	async findStudent(id: number) {
		return await this.db.student_info.findUnique({
			where: { id },
		});
	}
	async findStudentsBySchoolId(school_id: number) {
		return await this.db.student.findMany({
			where: { user: { school_id } },
			select: {
				id: true,
				file_n: true,
				user: {
					select: {
						id: true,
						email: true,
					},
				},
				student_course: {
					select: {
						course: true,
					},
				},
			},
		});
	}
}
