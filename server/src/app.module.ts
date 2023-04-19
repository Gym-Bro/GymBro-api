import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './infrastructure/firebase/firebase.module';
import { UserModule } from './modules/user/user.module';
import { MailingModule } from './infrastructure/mailing/mailing.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule, FirebaseModule, UserModule, MailingModule],

  providers: [AppService],
})
export class AppModule {}
