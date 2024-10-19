"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const prisma_service_1 = require("../../db/prisma.service");
const users_service_1 = require("../../users/users.service");
const common_1 = require("@nestjs/common");
let StudentsService = class StudentsService {
    constructor(usersService, db) {
        this.usersService = usersService;
        this.db = db;
    }
    async createStudent(student) {
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
    async findStudent(id) {
        return await this.db.student_info.findUnique({
            where: { id },
        });
    }
    async findStudentsBySchoolId(school_id) {
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
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map