import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PayloadConfirmation } from './types';

@Injectable()
export class EmailService {
	constructor(
		private readonly configService: ConfigService,
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService,
	) {}

	async sendConfirmationEmail({ id, email }: PayloadConfirmation) {
		const token = await this.jwtService.signAsync({ id });
		const url = `${this.configService.get('FRONTEND_URL')}/auth/change-password?token=${token}`;
		await this.mailerService.sendMail({
			to: email,
			subject: 'Bienvenido a Virtec',
			template: './confirmation',
			context: {
				email: email,
				url,
			},
		});
	}
}
