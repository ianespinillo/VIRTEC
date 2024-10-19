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
exports.CoursesService = void 0;
const prisma_service_1 = require("../../db/prisma.service");
const schools_service_1 = require("./schools.service");
const common_1 = require("@nestjs/common");
const preceptors_service_1 = require("./preceptors.service");
let CoursesService = class CoursesService {
    constructor(db, schoolService, preceptorsService) {
        this.db = db;
        this.schoolService = schoolService;
        this.preceptorsService = preceptorsService;
    }
    async createCourse(course, school_id) {
        const schoolExists = await this.schoolService.findSchool(school_id);
        if (!schoolExists)
            throw new common_1.BadRequestException('School not found');
        const courseExist = await this.findCourse({
            year: course.year,
            division: course.division,
            school_id: school_id,
            speciallity_id: course.speciallity_id,
        });
        if (courseExist)
            throw new common_1.BadRequestException('Course already exists');
        const preceptorExists = await this.preceptorsService.findPreceptorById(course.preceptor_id);
        if (!preceptorExists)
            throw new common_1.BadRequestException('Preceptor not found');
        return await this.db.course.create({
            data: {
                year: course.year,
                division: course.division,
                school_id: school_id,
                speciallity_id: course.speciallity_id,
                preceptor_id: course.preceptor_id,
            },
        });
    }
    async findCourse(course) {
        return await this.db.course.findUnique({
            where: {
                unique_year_and_division: {
                    year: course.year,
                    division: course.division,
                    school_id: course.school_id,
                    speciallity_id: course.speciallity_id,
                },
            },
        });
    }
    async findCourseById(courseId) {
        return await this.db.course.findUnique({
            where: {
                id: courseId,
            },
        });
    }
    async findAllCourses(school_id) {
        return await this.db.course.findMany({
            where: {
                school_id,
            },
        });
    }
    async deleteCourse(id) {
        return !!(await this.db.course.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        }));
    }
    async deleteCourseById(id) {
        return !!(await this.db.course.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        }));
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        schools_service_1.SchoolsService,
        preceptors_service_1.PreceptorsService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map