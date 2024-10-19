import { UsersService } from '@/users/users.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TokenOptions } from '@repo/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private usersService: UsersService,
		private configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(token_payload: TokenOptions) {
		const user = await this.usersService.findById(token_payload.sub);
		if (!user) {
			throw new ForbiddenException(`User ${token_payload.sub} does not exist`);
		}
		const userP = await this.usersService.getAllUserPermissions(
			token_payload.sub,
		);
		return {
			user: {
				...user,
				permissions: userP,
			},
		};
	}
}
