import type { UsersService } from '@/users/users.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { AuthUser } from '../../../../../packages/types/src/auth/types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh',
) {
	constructor(
		private UsersService: UsersService,
		private configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_REFRESH_SECRET'),
			passReqToCallback: true,
		});
	}

	async validate(req: Request, { id }: AuthUser) {
		const user = await this.UsersService.isActiveUser(id);
		if (!user) {
			throw new ForbiddenException(`User ${id} does not exist`);
		}
		if (!user.is_active) {
			throw new ForbiddenException('User not active');
		}
		const token = req.get('Authorization').replace('Bearer', '').trim();
		return { ...user, token };
	}
}
