import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from 'src/infrastructure/firebase/firebase.module';
import { UserModule } from '../user/user.module';
import { MailingModule } from 'src/infrastructure/mailing/mailing.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [FirebaseModule, UserModule, MailingModule],
})
export class AuthModule {}
