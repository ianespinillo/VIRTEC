import { SchoolsService } from '@/schools/services/schools.service';
export declare const getSchoolServiceMock: () => {
    provide: typeof SchoolsService;
    useValue: {
        findSchool: jest.Mock<any, any, any>;
        createSchool: jest.Mock<any, any, any>;
    };
};
