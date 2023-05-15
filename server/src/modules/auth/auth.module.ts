import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { FirebaseModule } from 'infrastructure/firebase/firebase.module';
import { MailingModule } from 'infrastructure/mailing/mailing.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [FirebaseModule, UserModule, MailingModule],
})
export class AuthModule {}
