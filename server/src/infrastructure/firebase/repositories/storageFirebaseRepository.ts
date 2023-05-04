import { HttpException, Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { StorageRepository } from 'infrastructure/storage/storage.interface';

@Injectable()
export class StorageFirebaseRepository implements StorageRepository {
  private readonly storeCollection;

  constructor(private readonly firebaseService: FirebaseService) {
    this.storeCollection =
      this.firebaseService.firestore.collection('contacts');
  }
  uploadFile(file: Express.Multer.File): Promise<string | HttpException> {
    throw new Error('Method not implemented.');
  }
}
