import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { UserFirebaseRepository } from './repositories/userFirebaseRepository';
import { ContactFirebaseRepository } from './repositories/contactFirebaseRepository';
import { StorageFirebaseRepository } from './repositories/storageFirebaseRepository';

@Module({
  providers: [
    FirebaseService,
    UserFirebaseRepository,
    ContactFirebaseRepository,
    StorageFirebaseRepository,
  ],
  exports: [
    FirebaseService,
    UserFirebaseRepository,
    ContactFirebaseRepository,
    StorageFirebaseRepository,
  ],
})
export class FirebaseModule {}
