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
exports.SpeciallityService = void 0;
const prisma_service_1 = require("../../db/prisma.service");
const schools_service_1 = require("./schools.service");
const common_1 = require("@nestjs/common");
let SpeciallityService = class SpeciallityService {
    constructor(schoolService, db) {
        this.schoolService = schoolService;
        this.db = db;
    }
    async createSpeciallity(speciallity) {
        const school = await this.schoolService.findSchool(speciallity.school_id);
        if (!school)
            throw new common_1.BadRequestException(`Could not find school ${speciallity.school_id}`);
        return await this.db.speciallity.create({
            data: {
                name: speciallity.name,
                school_id: speciallity.school_id,
            },
        });
    }
    async findSpeciallity(id) {
        return await this.db.speciallity.findUnique({
            where: {
                id,
            },
        });
    }
    async findAllBySchool(school_id) {
        return await this.db.speciallity.findMany({
            where: {
                school_id,
                deleted_at: null,
            },
        });
    }
    async deleteSpeciallity(id) {
        return await this.db.speciallity.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        });
    }
};
exports.SpeciallityService = SpeciallityService;
exports.SpeciallityService = SpeciallityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schools_service_1.SchoolsService,
        prisma_service_1.PrismaService])
], SpeciallityService);
//# sourceMappingURL=speciallity.service.js.map