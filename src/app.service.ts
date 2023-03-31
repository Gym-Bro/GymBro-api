import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase-admin/firestore';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export class AppService {
  constructor(private firebaseService: FirebaseService) {}

  public getHello(): string {
    return 'Hello World!';
  }

  public async getUsers(): Promise<DocumentData[]> {
    const db = this.firebaseService.firestore;
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map((doc) => doc.data());
  }
}
