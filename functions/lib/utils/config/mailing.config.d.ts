import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
export declare class MailerConfigService implements MailerOptionsFactory {
    createMailerOptions(): MailerOptions | Promise<MailerOptions>;
}
