"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const password_adapter_1 = require("../config/password-adapter");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const common_2 = require("@repo/common");
const courses_1 = require("../../prisma/fixtures/courses");
const permission_1 = require("../../prisma/fixtures/permission");
const schools_1 = require("../../prisma/fixtures/schools");
const users_1 = require("../../prisma/fixtures/users");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async seed() {
        const permissions = Object.entries(common_2.PERMISSIONS);
        const rolesArr = Object.entries(common_2.ROLES);
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
        for (const { id_permission, id_rol } of permission_1.role_permission) {
            await this.permissionRole.create({
                data: {
                    permission_id: id_permission,
                    role_id: id_rol,
                },
            });
        }
        const school = await this.school.create({
            data: schools_1.fakeSchool,
        });
        await this.schoolPeriod.create({
            data: {
                name: 'Primer Periodo',
            },
        });
        const preceptorPassword = await password_adapter_1.PasswordAdapter.generateHashedPassword(common_2.PASSWORD_LENGTH);
        const preceptor = await this.user.create({
            data: {
                email: users_1.preceptorFake.email,
                password: preceptorPassword.hashedPassword,
                school_id: school.id,
                role_id: 5,
                user_detail: {
                    create: users_1.preceptorFake.user_detail,
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
        for (const course of courses_1.courses) {
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
        const { hashedPassword, password } = await password_adapter_1.PasswordAdapter.generateHashedPassword(common_2.PASSWORD_LENGTH);
        await this.user.create({
            data: {
                email: users_1.adminFake.email,
                password: hashedPassword,
                school_id: school.id,
                role_id: 5,
                user_detail: {
                    create: users_1.adminFake.user_detail,
                },
            },
        });
        console.log('Password: ', password);
    }
    async resetDatabase() {
        await this.$connect();
        await this.$executeRaw `TRUNCATE TABLE 
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map