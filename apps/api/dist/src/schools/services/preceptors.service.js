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
exports.PreceptorsService = void 0;
const prisma_service_1 = require("../../db/prisma.service");
const users_service_1 = require("../../users/users.service");
const common_1 = require("@nestjs/common");
let PreceptorsService = class PreceptorsService {
    constructor(db, usersService) {
        this.db = db;
        this.usersService = usersService;
    }
    async createPreceptor(preceptor) {
        const pExist = (await this.usersService.findByDni(preceptor.dni)) ||
            (await this.usersService.findByEmail(preceptor.email));
        if (pExist)
            throw new common_1.BadRequestException('Preceptor already exists');
        return await this.db.$transaction(async (tx) => {
            const user = await this.usersService.createUser(preceptor);
            const { id } = await tx.preceptor.create({
                data: {
                    user_id: user.id,
                },
            });
            return {
                ...user,
                preceptor_id: id,
            };
        });
    }
    async findPreceptorById(id) {
        return await this.db.preceptor.findUnique({
            where: {
                id,
            },
        });
    }
    async findPreceptorsBySchoolId(school_id) {
        return await this.db.preceptor.findMany({
            where: {
                user: {
                    school_id,
                },
            },
            select: {
                course: {
                    select: {
                        year: true,
                        division: true,
                    },
                },
                id: true,
                user: {
                    select: {
                        user_detail: true,
                    },
                },
            },
        });
    }
    async deletePreceptor(id) {
        return !!(await this.db.preceptor.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        }));
    }
};
exports.PreceptorsService = PreceptorsService;
exports.PreceptorsService = PreceptorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], PreceptorsService);
//# sourceMappingURL=preceptors.service.js.map