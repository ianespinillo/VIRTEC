import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';

@Module({
	imports: [ConfigModule],
	controllers: [],
	exports: [CloudinaryService],
	providers: [CloudinaryService],
})
export class CloudinaryModule {}
