import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModule } from 'infrastructure/firebase/firebase.module';
import { MailingModule } from 'infrastructure/mailing/mailing.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [FirebaseModule, MailingModule],
  exports: [UserService],
})
export class UserModule {}
