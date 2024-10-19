import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService {
    api_key: string;
    api_secret: string;
    cloud_name: string;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<string>;
    deleteFile(url: string): Promise<boolean>;
}
