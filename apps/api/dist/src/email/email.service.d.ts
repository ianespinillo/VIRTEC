import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PayloadConfirmation } from './types';
export declare class EmailService {
    private readonly configService;
    private readonly mailerService;
    private readonly jwtService;
    constructor(configService: ConfigService, mailerService: MailerService, jwtService: JwtService);
    sendConfirmationEmail({ id, email }: PayloadConfirmation): Promise<void>;
}
