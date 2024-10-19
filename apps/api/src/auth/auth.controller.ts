import { UserDecorator } from '@/schools/types';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { AuthUser, LoginDniDTO, LoginEmailDTO } from '@repo/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { PermissionsNeeded } from './decorators/permissions.decorator';
import { User } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('/login/dni')
	async loginDni(
		@Body() body: LoginDniDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		const token = await this.authService.loginWithDni(body);
		res.cookie('token', token.acces_token, {
			domain: process.env.FRONTEND_URL,
		});
		return token;
	}

	@Post('/login/email')
	async loginEmail(
		@Body() body: LoginEmailDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		const token = await this.authService.loginWithEmail(body);
		res.cookie('token', token.acces_token, {
			sameSite: 'none',
			secure: true,
			httpOnly: false,

			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
		});

		return token;
	}

	@PermissionsNeeded()
	@Get('/roles')
	async getRoles(@User() user: UserDecorator) {
		return await this.authService.getRole(user.role_id);
	}
}
