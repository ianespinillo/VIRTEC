import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginDniDTO } from '../../../../packages/types/src/auth/login-dni.dto';
import type { LoginEmailDTO } from '../../../../packages/types/src/auth/login-password.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('/login/dni')
	async loginDni(@Body() body: LoginDniDTO, @Res({ passthrough: true }) res:Response) {
		const token = await this.authService.loginWithDni(body);
		res.cookie('token', token.acces_token, { httpOnly: true, domain: process.env.FRONTEND_URL });
		return token;
	}

	@Post('/login/email')
	async loginEmail(@Body() body: LoginEmailDTO, @Res({ passthrough: true }) res:Response) {
		const token = await this.authService.loginWithEmail(body);
		res.cookie('token', token.acces_token, { httpOnly: true, domain: process.env.FRONTEND_URL });
		
	}
}
