import { UsersService } from '@/users/users.service';
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import type { LoginDniDTO } from '../../../../packages/types/src/auth/login-dni.dto';
import type { LoginEmailDTO } from '../../../../packages/types/src/auth/login-password.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async loginWithDni(user: LoginDniDTO) {
		const userExist = await this.usersService.findByDni(user.dni);
		if (!userExist) {
			throw new NotFoundException(`User with dni ${user.dni} does not exist`);
		}
		const matches = await compare(user.password, userExist.user.password);
		if (!matches) {
			throw new UnauthorizedException('Wrong password');
		}
		const payload = {
			dni: user.dni,
			sub: userExist.user.id,
		};
		const token = await this.jwtService.signAsync(payload);
		return { acces_token: token };
	}

	async loginWithEmail(user: LoginEmailDTO) {
		const userExist = await this.usersService.findByEmail(user.email);
		if (!userExist) {
			throw new NotFoundException("User doesn't exist");
		}
		const matches = await compare(user.password, userExist.password);
		if (!matches) {
			throw new UnauthorizedException('Wrong password');
		}
		const payload = {
			dni: userExist.user_detail.dni,
			sub: userExist.id,
		};
		const token = await this.jwtService.signAsync(payload);
		return { acces_token: token };
	}
}
