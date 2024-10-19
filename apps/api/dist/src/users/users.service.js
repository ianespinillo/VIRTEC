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
exports.UsersService = void 0;
const password_adapter_1 = require("../config/password-adapter");
const email_service_1 = require("../email/email.service");
const schools_service_1 = require("../schools/services/schools.service");
const common_1 = require("@nestjs/common");
const common_2 = require("@repo/common");
const prisma_service_1 = require("../db/prisma.service");
let UsersService = class UsersService {
    constructor(db, schoolService, emailServie) {
        this.db = db;
        this.schoolService = schoolService;
        this.emailServie = emailServie;
    }
    async createUser(user) {
        const userExist = (await this.findByEmail(user.email)) || (await this.findByDni(user.dni));
        if (userExist)
            throw new common_1.BadRequestException('User already exists');
        const { hashedPassword } = await password_adapter_1.PasswordAdapter.generateHashedPassword(common_2.PASSWORD_LENGTH);
        const school = await this.schoolService.findSchool(user.school_id);
        if (!school)
            throw new common_1.NotFoundException('School not found');
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
    async findByEmail(email) {
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
    async findByDni(dni) {
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
    async isActiveUser(email) {
        return await this.db.user.findUnique({
            where: { email },
            select: {
                is_active: true,
            },
        });
    }
    async findById(id) {
        return await this.db.user.findUnique({ where: { id } });
    }
    async getAllUserPermissions(id) {
        const p = await this.db.user_permissions.findMany({
            where: {
                user_id: id,
            },
        });
        return p.map((p) => p.name);
    }
    async getUserRole(id) {
        return this.db.roles.findFirst({
            where: {
                id,
            },
        });
    }
    async updateUser(id, user) {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        schools_service_1.SchoolsService,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=users.service.js.map