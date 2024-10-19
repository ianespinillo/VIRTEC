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
exports.SchoolsService = void 0;
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
const prisma_service_1 = require("../../db/prisma.service");
const common_1 = require("@nestjs/common");
let SchoolsService = class SchoolsService {
    constructor(cloudinaryService, db) {
        this.cloudinaryService = cloudinaryService;
        this.db = db;
    }
    async createSchool(school) {
        const schoolExists = await this.schoolExists(school);
        if (schoolExists)
            throw new common_1.BadRequestException('School already exists');
        const url = await this.cloudinaryService.uploadFile(school.crest);
        if (!url)
            throw new common_1.BadRequestException('Error uploading file');
        return await this.db.school.create({
            data: {
                name: school.name,
                address: school.address,
                crest_url: url,
            },
        });
    }
    async schoolExists(school) {
        const schoolExists = await this.db.school.findFirst({
            where: {
                name: school.name,
                address: school.address,
            },
        });
        return !!schoolExists;
    }
    async findSchool(id) {
        return await this.db.school.findUnique({
            where: {
                id,
            },
        });
    }
    async findAllSchools() {
        return await this.db.school.findMany({
            where: {
                deleted_at: null,
            },
        });
    }
    async deleteSchool(id) {
        return await this.db.school.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        });
    }
    async updateSchool(id, school) {
        const oldSchool = await this.findSchool(id);
        if (oldSchool.crest_url) {
            await this.cloudinaryService.deleteFile(oldSchool.crest_url);
        }
        const url = await this.cloudinaryService.uploadFile(school.crest);
        if (!url)
            throw new common_1.BadRequestException('Error uploading file');
        return await this.db.school.update({
            where: {
                id,
            },
            data: {
                name: school.name,
                address: school.address,
                crest_url: url,
                updated_at: new Date(),
            },
        });
    }
};
exports.SchoolsService = SchoolsService;
exports.SchoolsService = SchoolsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        prisma_service_1.PrismaService])
], SchoolsService);
//# sourceMappingURL=schools.service.js.map