import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailOptions } from 'utils/interfaces/IMailing';
import { SentMessageInfo } from 'nodemailer';
@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(mailOptions: MailOptions): Promise<SentMessageInfo> {
    try {
      // Send email using the MailerService and provided mailOptions
      return await this.mailerService.sendMail(mailOptions);
    } catch (err) {
      console.error('Failed to send email', err);
    }
  }
}
