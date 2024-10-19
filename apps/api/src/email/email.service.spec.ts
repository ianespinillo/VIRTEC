import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { PayloadConfirmation } from './types';

const jwtServiceMock = {
	signAsync: jest.fn(),
};

const mailerServiceMock = {
	sendMail: jest.fn(),
};

const configServiceMock = {
	get: jest.fn(),
};
describe('EmailService', () => {
	let service: EmailService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EmailService,
				{
					provide: MailerService,
					useValue: mailerServiceMock,
				},
				{
					provide: JwtService,
					useValue: jwtServiceMock,
				},
				{
					provide: ConfigService,
					useValue: configServiceMock,
				},
			],
		}).compile();
		service = module.get<EmailService>(EmailService);
	});

	describe('EmailService tests', () => {
		it('should send a confirmation email', async () => {
			const payloadConfirmation: PayloadConfirmation = {
				id: '1',
				email: 'email@example.com',
			};

			configServiceMock.get.mockReturnValue('http://localhost:3000');
			const token = jwtServiceMock.signAsync.mockReturnValue('token');
			mailerServiceMock.sendMail.mockReturnValue({});
			await service.sendConfirmationEmail(payloadConfirmation);
			expect(mailerServiceMock.sendMail).toHaveBeenCalledWith({
				to: payloadConfirmation.email,
				subject: 'Bienvenido a Virtec',
				template: './confirmation',
				context: {
					email: payloadConfirmation.email,
					url: expect.stringContaining('http://localhost:3000/auth/change-password'),
				},
			});
			expect(configServiceMock.get).toHaveBeenCalledWith('FRONTEND_URL');
			expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
				id: payloadConfirmation.id,
			});
			expect(mailerServiceMock.sendMail).toHaveBeenCalled();
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
