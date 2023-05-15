import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModule } from 'infrastructure/firebase/firebase.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [FirebaseModule],
  exports: [UserService],
})
export class UserModule {}
