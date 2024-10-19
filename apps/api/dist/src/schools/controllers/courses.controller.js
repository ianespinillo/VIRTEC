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
exports.CoursesController = void 0;
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const user_decorator_1 = require("../../auth/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const common_2 = require("@repo/common");
const courses_service_1 = require("../services/courses.service");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async create(user, course) {
        return this.coursesService.createCourse(course, user.school_id);
    }
    async findAllCourses(user) {
        return this.coursesService.findAllCourses(user.school_id);
    }
    async findCourseById(id) {
        return this.coursesService.findCourseById(id);
    }
    async delete(id) {
        return this.coursesService.deleteCourse(id);
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.CREATE_COURSE),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "create", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_COURSES),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAllCourses", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_COURSES),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findCourseById", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.DELETE_COURSE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "delete", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map