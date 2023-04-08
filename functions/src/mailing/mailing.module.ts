import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigService } from './../utils/config/mailing.config';
import { MailingService } from './mailing.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerConfigService,
    }),
  ],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
