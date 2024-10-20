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
exports.TeachersController = void 0;
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const user_decorator_1 = require("../../auth/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const common_2 = require("@repo/common");
const teachers_service_1 = require("../services/teachers.service");
let TeachersController = class TeachersController {
    constructor(teachersService) {
        this.teachersService = teachersService;
    }
    async create(user, teacher) {
        return await this.teachersService.create(teacher);
    }
    async findAllTeachersBySchool(user) {
        return await this.teachersService.findAllTeachersBySchool(user.school_id);
    }
    async findAll() {
        return await this.teachersService.findAllTeachers();
    }
    async findOne(surname) {
        return await this.teachersService.findBySurname(surname);
    }
};
exports.TeachersController = TeachersController;
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.CREATE_TEACHERS),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "create", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_TEACHERS),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findAllTeachersBySchool", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_TEACHERS),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findAll", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_TEACHERS),
    (0, common_1.Get)(':surname'),
    __param(0, (0, common_1.Param)('surname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findOne", null);
exports.TeachersController = TeachersController = __decorate([
    (0, common_1.Controller)('teachers'),
    __metadata("design:paramtypes", [teachers_service_1.TeachersService])
], TeachersController);
//# sourceMappingURL=teachers.controller.js.map