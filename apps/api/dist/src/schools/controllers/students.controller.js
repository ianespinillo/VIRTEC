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
exports.StudentsController = void 0;
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const user_decorator_1 = require("../../auth/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const common_2 = require("@repo/common");
const students_service_1 = require("../services/students.service");
let StudentsController = class StudentsController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async createStudent(student) {
        return await this.studentService.createStudent(student);
    }
    async getStudents(user) {
        return await this.studentService.findStudentsBySchoolId(user.school_id);
    }
    async getStudent(id) {
        return await this.studentService.findStudent(id);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.CREATE_STUDENTS),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createStudent", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_STUDENTS_LIST),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudents", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_STUDENTS_LIST),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudent", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map