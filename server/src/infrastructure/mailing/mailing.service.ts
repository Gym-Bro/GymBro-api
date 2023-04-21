import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailOptions } from 'src/utils/interfaces/IMailing';

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(mailOptions: MailOptions): Promise<void> {
    try {
      // Send email using the MailerService and provided mailOptions
      return await this.mailerService.sendMail(mailOptions);
    } catch (err) {
      console.error('Failed to send email', err);
    }
  }
}
