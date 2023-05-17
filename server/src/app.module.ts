import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './infrastructure/firebase/firebase.module';
import { UserModule } from './modules/user/user.module';
import { MailingModule } from './infrastructure/mailing/mailing.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  controllers: [AppController],
  imports: [FirebaseModule, UserModule, MailingModule, ContactModule],

  providers: [AppService],
})
export class AppModule {}
