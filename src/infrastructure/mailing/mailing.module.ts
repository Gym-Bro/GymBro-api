import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailingService } from './mailing.service';
import { MailerConfigService } from 'src/utils/config/mailing.config';

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
