import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { UserFirebaseRepository } from './repositories/userFirebaseRepository';
import { ContactFirebaseRepository } from './repositories/contactFirebaseRepository';

@Module({
  providers: [
    FirebaseService,
    UserFirebaseRepository,
    ContactFirebaseRepository,
  ],
  exports: [FirebaseService, UserFirebaseRepository, ContactFirebaseRepository],
})
export class FirebaseModule {}
