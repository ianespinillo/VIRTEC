import { CloudinaryService } from '@/cloudinary/cloudinary.service';

export const getCloudinaryMockService = () => ({
	provide: CloudinaryService,
	useValue: {
		uploadFile: jest.fn().mockResolvedValue('some url'),
	},
});
