import { CloudinaryService } from '@/cloudinary/cloudinary.service';
export declare const getCloudinaryMockService: () => {
    provide: typeof CloudinaryService;
    useValue: {
        uploadFile: jest.Mock<any, any, any>;
    };
};
