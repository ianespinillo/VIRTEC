"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchoolServiceMock = void 0;
const schools_service_1 = require("../schools/services/schools.service");
const getSchoolServiceMock = () => ({
    provide: schools_service_1.SchoolsService,
    useValue: {
        findSchool: jest.fn(),
        createSchool: jest.fn(),
    },
});
exports.getSchoolServiceMock = getSchoolServiceMock;
//# sourceMappingURL=school.service.mock.js.map