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
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let EmailService = class EmailService {
    constructor(configService, mailerService, jwtService) {
        this.configService = configService;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
    }
    async sendConfirmationEmail({ id, email }) {
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
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mailer_1.MailerService,
        jwt_1.JwtService])
], EmailService);
//# sourceMappingURL=email.service.js.map