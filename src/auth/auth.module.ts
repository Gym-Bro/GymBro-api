import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from './../firebase/firebase.module';
// import { FirebaseService } from './../firebase/firebase.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [FirebaseModule],
})
export class AuthModule {}
