import { MailerService } from '@nestjs-modules/mailer';
import { MailOptions } from './../utils/interfaces/IMailing';
export declare class MailingService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail(mailOptions: MailOptions): Promise<void>;
}
