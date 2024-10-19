"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolsModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const db_module_1 = require("../db/db.module");
const users_module_1 = require("../users/users.module");
const common_1 = require("@nestjs/common");
const courses_controller_1 = require("./controllers/courses.controller");
const preceptors_controller_1 = require("./controllers/preceptors.controller");
const school_admin_controller_1 = require("./controllers/school-admin.controller");
const schools_controller_1 = require("./controllers/schools.controller");
const speciallity_controller_1 = require("./controllers/speciallity.controller");
const students_controller_1 = require("./controllers/students.controller");
const subjects_controller_1 = require("./controllers/subjects.controller");
const courses_service_1 = require("./services/courses.service");
const preceptors_service_1 = require("./services/preceptors.service");
const school_admin_service_1 = require("./services/school-admin.service");
const schools_service_1 = require("./services/schools.service");
const speciallity_service_1 = require("./services/speciallity.service");
const students_service_1 = require("./services/students.service");
const subjects_service_1 = require("./services/subjects.service");
const teachers_service_1 = require("./services/teachers.service");
let SchoolsModule = class SchoolsModule {
};
exports.SchoolsModule = SchoolsModule;
exports.SchoolsModule = SchoolsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cloudinary_module_1.CloudinaryModule,
            db_module_1.DbModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        exports: [schools_service_1.SchoolsService],
        controllers: [
            schools_controller_1.SchoolsController,
            subjects_controller_1.SubjectsController,
            students_controller_1.StudentsController,
            speciallity_controller_1.SpeciallityController,
            preceptors_controller_1.PreceptorsController,
            courses_controller_1.CoursesController,
            school_admin_controller_1.SchoolAdminController,
        ],
        providers: [
            schools_service_1.SchoolsService,
            speciallity_service_1.SpeciallityService,
            subjects_service_1.SubjectsService,
            students_service_1.StudentsService,
            preceptors_service_1.PreceptorsService,
            courses_service_1.CoursesService,
            teachers_service_1.TeachersService,
            school_admin_service_1.SchoolAdminService,
        ],
    })
], SchoolsModule);
//# sourceMappingURL=schools.module.js.map