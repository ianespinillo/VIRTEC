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
exports.TeachersService = void 0;
const prisma_service_1 = require("../../db/prisma.service");
const users_service_1 = require("../../users/users.service");
const common_1 = require("@nestjs/common");
let TeachersService = class TeachersService {
    constructor(db, usersService) {
        this.db = db;
        this.usersService = usersService;
    }
    async create(teacher) {
        const tExists = await this.findByFileN(teacher.file_n);
        if (tExists)
            throw new common_1.BadRequestException('Teacher already exists');
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
    async findByFileN(file_n) {
        return await this.db.teacher.findFirst({
            where: { file_n, deleted_at: null },
        });
    }
    findById(id) {
        return this.db.teacher.findUnique({
            where: {
                id,
                deleted_at: null,
            },
        });
    }
    async findAllTeachersBySchool(school_id) {
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
    findBySurname(surname) {
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
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map