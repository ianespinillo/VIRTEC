import { ConfigService } from '@nestjs/config';
import { Test, type TestingModule } from '@nestjs/testing';
import { v2 as Cloudinary } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';

// Mock ConfigService
const configService = {
	get: jest.fn((key: string) => {
		switch (key) {
			case 'CLOUDINARY_API_KEY':
				return 'CLOUDINARY_API_KEY';
			case 'CLOUDINARY_API_SECRET':
				return 'CLOUDINARY_API_SECRET';
			case 'CLOUDINARY_CLOUD_NAME':
				return 'CLOUD_NAME';
			default:
				return null;
		}
	}),
} as unknown as ConfigService;
// Mock fs/promises

jest.mock('node:fs/promises', () => ({
	writeFile: jest.fn(),
}));

// Mock path and process
jest.mock('node:path', () => ({
	__esModule: true,
	default: {
		join: jest.fn(),
	},
}));

jest.mock('node:process', () => ({
	cwd: jest.fn(),
}));

// Mock Cloudinary SDK
jest.mock('cloudinary', () => ({
	v2: {
		config: jest.fn(),
		uploader: {
			upload: jest.fn(),
		},
	},
}));

const uploadMock = Cloudinary.uploader.upload as jest.Mock;

describe('CloudinaryService', () => {
	let cloudinaryService: CloudinaryService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: ConfigService,
					useValue: configService,
				},

				CloudinaryService,
			],
		}).compile();

		cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
	});
	describe('CloudinaryService tests', () => {
		it('should upload a file', async () => {
			// Mock the response from Cloudinary
			const cloudResponse = {
				secure_url: 'some_url',
			};

			// Set up mocks
			uploadMock.mockResolvedValue(cloudResponse);

			// Create a mock file (File object simulation)
			const fileName = 'hello.txt';
			const fileContent = 'hello world';
			const mockFile = new File([fileContent], fileName);

			// Call the method under test
			const result = await cloudinaryService.uploadFile(mockFile);

			// Assert the expected outcome
			expect(result).toEqual(cloudResponse.secure_url);
		});
	});

	it('should be defined', () => {
		expect(cloudinaryService).toBeDefined();
	});
});
