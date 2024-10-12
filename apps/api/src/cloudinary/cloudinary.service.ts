import { writeFile, mkdir } from 'node:fs/promises';
import path, { join } from 'node:path';
import { cwd } from 'node:process';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  api_key: string;
  api_secret: string;
  cloud_name: string;

  constructor(configService: ConfigService) {
    this.api_key = configService.get('CLOUDINARY_API_KEY');
    this.api_secret = configService.get('CLOUDINARY_API_SECRET');
    this.cloud_name = configService.get('CLOUDINARY_CLOUD_NAME');

    Cloudinary.config({
      cloud_name: this.cloud_name,
      api_key: this.api_key,
      api_secret: this.api_secret,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const tempDir = join(cwd(), '/temp');
      await mkdir(tempDir, { recursive: true }); // Asegurarse de que exista el directorio
      const filePath = join(tempDir, file.originalname);

      await writeFile(filePath, new Uint8Array(file.buffer));
      const response = await Cloudinary.uploader.upload(filePath, {
        public_id: file.originalname,
        folder: 'schools-crest/',
      });

      return response.secure_url;
    } catch (error) {
		console.log(error)
      throw new InternalServerErrorException('Error uploading file');
    }
  }
  async deleteFile(url: string) {
	const id = url.split('/').slice(-1)[0].split('.')[0]
	const folder 		= 'schools-crest/';
	const response 	= await Cloudinary.uploader.destroy(folder + id);
	return Boolean(response)
  }
}
