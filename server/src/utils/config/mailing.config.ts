import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        host: 'sandbox.smtp.mailtrap.io', // Mailtrap SMTP host
        port: 2525, // Mailtrap SMTP port
        auth: {
          user: '24bbc15981c224',
          pass: '31f11f55057bcd',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>', // replace with your default "from" address
      },
    };
  }
}
