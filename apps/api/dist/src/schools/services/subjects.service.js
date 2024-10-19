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
exports.SubjectsService = void 0;
const prisma_service_1 = require("../../db/prisma.service");
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const teachers_service_1 = require("./teachers.service");
let SubjectsService = class SubjectsService {
    constructor(db, coursesService, teacherService) {
        this.db = db;
        this.coursesService = coursesService;
        this.teacherService = teacherService;
    }
    async createSubject(subject) {
        const { name, start_time, end_time, teacher_id, course_id } = subject;
        const course = await this.coursesService.findCourseById(course_id);
        if (!course) {
            throw new common_1.BadRequestException('School not found');
        }
        const teacher = await this.teacherService.findById(teacher_id);
        if (!teacher) {
            throw new common_1.BadRequestException('Teacher not found');
        }
        const subjectExists = await this.findSubject(subject);
        if (subjectExists) {
            throw new common_1.BadRequestException('Subject already exists');
        }
        return await this.db.subject.create({
            data: {
                name,
                start_time,
                end_time,
                course_id,
                teacher_id,
            },
        });
    }
    async findSubject(subject) {
        return await this.db.subject.findUnique({
            where: {
                unique_subject: {
                    name: subject.name,
                    start_time: subject.start_time,
                    end_time: subject.end_time,
                    course_id: subject.course_id,
                },
            },
        });
    }
    async findAllBySchool(school_id) {
        return await this.db.subject.findMany({
            where: {
                course: {
                    school_id,
                },
                deleted_at: null,
            },
            select: {
                id: true,
                name: true,
                start_time: true,
                end_time: true,
                course: true,
                teacher: true,
            },
        });
    }
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        courses_service_1.CoursesService,
        teachers_service_1.TeachersService])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map