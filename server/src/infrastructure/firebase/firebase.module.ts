import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { UserFirebaseRepository } from './repositories/userFirebaseRepository';

@Module({
  providers: [FirebaseService, UserFirebaseRepository],
  exports: [FirebaseService, UserFirebaseRepository],
})
export class FirebaseModule {}
