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
exports.SchoolAdminService = void 0;
const prisma_service_1 = require("../../db/prisma.service");
const users_service_1 = require("../../users/users.service");
const common_1 = require("@nestjs/common");
let SchoolAdminService = class SchoolAdminService {
    constructor(userService, db) {
        this.userService = userService;
        this.db = db;
    }
    async create(admin) {
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
    async findAdminsBySchool(id) {
        return this.db.user_roles.findMany({
            where: {
                rol_id: 1,
                school_id: id,
            },
        });
    }
    async findAdminById(id) {
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
    async deleteAdmin(id) {
        return this.db.user.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        });
    }
    async updateAdmin(id, admin) {
        return this.userService.updateUser(id, admin);
    }
};
exports.SchoolAdminService = SchoolAdminService;
exports.SchoolAdminService = SchoolAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        prisma_service_1.PrismaService])
], SchoolAdminService);
//# sourceMappingURL=school-admin.service.js.map