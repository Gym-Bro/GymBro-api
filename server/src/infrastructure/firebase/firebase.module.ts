import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { UserFirebaseRepository } from './repositories/userFirebaseRepository';
import { ContactFirebaseRepository } from './repositories/contactFirebaseRepository';
import { AuthFirebaseRepository } from './repositories/authFirebaseRepository';

@Module({
  providers: [
    FirebaseService,
    UserFirebaseRepository,
    ContactFirebaseRepository,
    AuthFirebaseRepository,
  ],
  exports: [
    FirebaseService,
    UserFirebaseRepository,
    ContactFirebaseRepository,
    AuthFirebaseRepository,
  ],
})
export class FirebaseModule {}
