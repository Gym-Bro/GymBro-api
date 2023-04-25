import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MailingModule } from '../../infrastructure/mailing/mailing.module';
import { FirebaseModule } from '../../infrastructure/firebase/firebase.module';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [FirebaseModule, MailingModule],
  exports: [ContactService],
})
export class ContactModule {}
