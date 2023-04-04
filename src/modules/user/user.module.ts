import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModule } from './../../firebase/firebase.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [FirebaseModule],
  exports: [UserService],
})
export class UserModule {}
