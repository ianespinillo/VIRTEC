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
exports.SchoolAdminController = void 0;
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const common_1 = require("@nestjs/common");
const common_2 = require("@repo/common");
const school_admin_service_1 = require("../services/school-admin.service");
let SchoolAdminController = class SchoolAdminController {
    constructor(schoolAdminService) {
        this.schoolAdminService = schoolAdminService;
    }
    async createSchoolAdmin(body) {
        return await this.schoolAdminService.create(body);
    }
    async getSchoolAdmins() {
        return await this.schoolAdminService.findAllActiveAdmins();
    }
    async getSchoolAdmin(id) {
        return await this.schoolAdminService.findAdminById(id);
    }
    async getSchoolAdminsBySchool(id) {
        return await this.schoolAdminService.findAdminsBySchool(id);
    }
    async deleteSchoolAdmin(id) {
        return await this.schoolAdminService.deleteAdmin(id);
    }
    async updateSchoolAdmin(id, body) {
        return await this.schoolAdminService.updateAdmin(id, body);
    }
};
exports.SchoolAdminController = SchoolAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.CREATE_SCHOOL_ADMINS),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], SchoolAdminController.prototype, "createSchoolAdmin", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_SCHOOL_ADMINS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchoolAdminController.prototype, "getSchoolAdmins", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_SCHOOL_ADMINS),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolAdminController.prototype, "getSchoolAdmin", null);
__decorate([
    (0, common_1.Get)('school/:id'),
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_SCHOOL_ADMINS),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchoolAdminController.prototype, "getSchoolAdminsBySchool", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.DELETE_SCHOOL_ADMINS),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolAdminController.prototype, "deleteSchoolAdmin", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.UPDATE_SCHOOL_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, common_2.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], SchoolAdminController.prototype, "updateSchoolAdmin", null);
exports.SchoolAdminController = SchoolAdminController = __decorate([
    (0, common_1.Controller)('school-admin'),
    __metadata("design:paramtypes", [school_admin_service_1.SchoolAdminService])
], SchoolAdminController);
//# sourceMappingURL=school-admin.controller.js.map