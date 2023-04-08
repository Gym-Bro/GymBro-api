import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from './../firebase/firebase.module';
import { UserModule } from '../modules/user/user.module';
import { MailingModule } from './../mailing/mailing.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [FirebaseModule, UserModule, MailingModule],
})
export class AuthModule {}
