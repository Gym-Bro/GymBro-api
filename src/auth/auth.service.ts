import { Injectable } from '@nestjs/common';
import { FirebaseService } from './../firebase/firebase.service';
import { User } from './../models/user.model';
import { UserRecord } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  public async register(body: Omit<User, 'id'>) {
    const user: UserRecord = await this.firebaseService.auth.createUser({
      email: body.email,
      password: body.password,
    });

    if (user.uid) {
      console.log('insertando a firestore');
      await this.firebaseService.userCollection.add(body);
      return 'agregado a la db';
    }
    return 'blabla';
  }

  public async login(email: string, password: string) {}
}
