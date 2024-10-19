"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async loginWithDni(user) {
        const userExist = await this.usersService.findByDni(user.dni);
        if (!userExist) {
            throw new common_1.NotFoundException(`User with dni ${user.dni} does not exist`);
        }
        const matches = await (0, bcryptjs_1.compare)(user.password, userExist.user.password);
        if (!matches) {
            throw new common_1.UnauthorizedException('Wrong password');
        }
        const payload = {
            dni: user.dni,
            sub: userExist.user.id,
        };
        const token = await this.jwtService.signAsync(payload);
        return { acces_token: token };
    }
    async loginWithEmail(user) {
        const userExist = await this.usersService.findByEmail(user.email);
        if (!userExist) {
            throw new common_1.NotFoundException("User doesn't exist");
        }
        const matches = await (0, bcryptjs_1.compare)(user.password, userExist.password);
        if (!matches) {
            throw new common_1.UnauthorizedException('Wrong password');
        }
        const payload = {
            dni: userExist.user_detail.dni,
            sub: userExist.id,
        };
        const token = await this.jwtService.signAsync(payload);
        return { acces_token: token };
    }
    async getRole(role_id) {
        return this.usersService.getUserRole(role_id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map