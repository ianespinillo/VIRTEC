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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const permissions_decorator_1 = require("./decorators/permissions.decorator");
const user_decorator_1 = require("./decorators/user.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async loginDni(body, res) {
        const token = await this.authService.loginWithDni(body);
        res.cookie('token', token.acces_token, {
            domain: process.env.FRONTEND_URL,
        });
        return token;
    }
    async loginEmail(body, res) {
        const token = await this.authService.loginWithEmail(body);
        res.cookie('token', token.acces_token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        return token;
    }
    async getRoles(user) {
        return await this.authService.getRole(user.role_id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login/dni'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginDni", null);
__decorate([
    (0, common_1.Post)('/login/email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginEmail", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(),
    (0, common_1.Get)('/roles'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRoles", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map