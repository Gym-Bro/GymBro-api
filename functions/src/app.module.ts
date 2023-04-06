import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './modules/user/user.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule, FirebaseModule, UserModule],
  providers: [AppService],
})
export class AppModule {}
