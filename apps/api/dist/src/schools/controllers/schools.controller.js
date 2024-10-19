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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolsController = void 0;
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const schools_service_1 = require("../services/schools.service");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@repo/common");
let SchoolsController = class SchoolsController {
    constructor(schoolsService) {
        this.schoolsService = schoolsService;
    }
    async create(body, crest) {
        return await this.schoolsService.createSchool({
            ...body,
            crest,
        });
    }
    async findAll() {
        return await this.schoolsService.findAllSchools();
    }
    async findOne(id) {
        return await this.schoolsService.findSchool(id);
    }
    async delete(id) {
        return await this.schoolsService.deleteSchool(id);
    }
    async update(id, body, crest) {
        return await this.schoolsService.updateSchool(id, {
            ...body,
            crest,
        });
    }
};
exports.SchoolsController = SchoolsController;
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.CREATE_SCHOOLS),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('crest')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "create", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_SCHOOLS_LIST),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "findAll", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_SCHOOLS_LIST),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "findOne", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.DELETE_SCHOOLS),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "delete", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.UPDATE_SCHOOLS),
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('crest')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Object]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "update", null);
exports.SchoolsController = SchoolsController = __decorate([
    (0, common_1.Controller)('schools'),
    __metadata("design:paramtypes", [schools_service_1.SchoolsService])
], SchoolsController);
//# sourceMappingURL=schools.controller.js.map