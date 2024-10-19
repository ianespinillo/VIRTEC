"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCloudinaryMockService = void 0;
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const getCloudinaryMockService = () => ({
    provide: cloudinary_service_1.CloudinaryService,
    useValue: {
        uploadFile: jest.fn().mockResolvedValue('some url'),
    },
});
exports.getCloudinaryMockService = getCloudinaryMockService;
//# sourceMappingURL=cloudinary.mock.js.map