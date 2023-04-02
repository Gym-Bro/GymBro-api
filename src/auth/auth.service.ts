import { Injectable } from '@nestjs/common';
import { FirebaseService } from './../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  public async register(body, idToken) {
    try {
      // Here we must verify the auth token and later redirect to
      // the createUser controller to add the user
      const result = await this.firebaseService.auth.verifyIdToken(idToken);
      if (result.email === body.email) {
        //create a user with createUserService...
        return 'user verified!';
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  public async login(email: string, password: string) {
    try {
      // Here we must verify the auth token provided from the client...
    } catch (error) {
      return error;
    }
  }
}
