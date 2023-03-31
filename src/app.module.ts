import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
@Module({
  controllers: [AppController],
  imports: [AuthModule, FirebaseModule],
  providers: [AppService],
})
export class AppModule {}
