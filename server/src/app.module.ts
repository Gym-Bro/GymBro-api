import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './infrastructure/firebase/firebase.module';
import { UserModule } from './modules/user/user.module';
import { MailingModule } from './infrastructure/mailing/mailing.module';
import { ContactModule } from './modules/contact/contact.module';
import { FilesModule } from 'infrastructure/files/files.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    FirebaseModule,
    UserModule,
    MailingModule,
    ContactModule,
    FilesModule,
  ],

  providers: [AppService],
})
export class AppModule {}
