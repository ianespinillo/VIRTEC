import { join } from 'node:path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from './email.service';

@Module({
	providers: [EmailService],
	imports: [
		ConfigModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '4h' },
		}),
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: 'smtp.gmail.com',
					port: 465,
					auth: {
						user: config.get('EMAIL_USER'),
						pass: config.get('EMAIL_PASSWORD'),
					},
				},
				defaults: {
					from: '<no-reply> VIRTEC',
				},
				template: {
					dir: join(process.cwd(), 'templates'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
			inject: [ConfigService],
			imports: [ConfigModule],
		}),
	],
	exports: [EmailService],
})
export class EmailModule {}
