import { UsersService } from '@/users/users.service';
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { LoginDniDTO, LoginEmailDTO } from '@repo/common';
import { compare } from 'bcryptjs';

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
	async getRole(role_id: number) {
		return this.usersService.getUserRole(role_id);
	}
}
//
