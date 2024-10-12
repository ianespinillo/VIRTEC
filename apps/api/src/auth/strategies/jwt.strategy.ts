import { UsersService } from '@/users/users.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
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

	async validate(user_id: string) {
		const user = await this.usersService.findById(user_id);
		if (!user) {
			throw new ForbiddenException(`User ${user_id} does not exist`);
		}
		const userP = await this.usersService.getAllUserPermissions(user_id);
		return {
			user: {
				...user,
				permissions: userP,
			},
		};
	}
}
