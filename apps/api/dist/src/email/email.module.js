"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const node_path_1 = require("node:path");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("./email.service");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        providers: [email_service_1.EmailService],
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '4h' },
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 465,
                        auth: {
                            user: config.get('EMAIL_USER'),
                            pass: config.get('EMAIL_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: '<no-reply> VIRTEC',
                    },
                    template: {
                        dir: (0, node_path_1.join)(process.cwd(), 'templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
                imports: [config_1.ConfigModule],
            }),
        ],
        exports: [email_service_1.EmailService],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map