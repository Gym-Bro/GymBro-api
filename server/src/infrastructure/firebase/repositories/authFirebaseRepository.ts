import { Injectable } from '@nestjs/common';
import { User, UserClean } from 'modules/user/entities/user.entity';
import { UserAuthRepository } from 'modules/user/repositories/userAuth.repository';
import { FirebaseService } from '../firebase.service';
import { auth } from 'firebase-admin';
import { RegisterUserRequestDto } from 'modules/user/dto/register-user.dto';

@Injectable()
export class AuthFirebaseRepository implements UserAuthRepository {
  private readonly userAuth: auth.Auth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.userAuth = this.firebaseService.auth;
  }

  async register(registerUser: RegisterUserRequestDto): Promise<User> {
    try {
      const result = await this.userAuth.createUser({
        email: registerUser.email,
        password: registerUser.password,
      });
      if (result.uid) return new User(registerUser);
      else throw Error('Cannot register user in Firebase!');
    } catch (error) {
      console.log(error);
      return error.message;
    }

    throw new Error('Method not implemented.');
  }
  login(email: string, password: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  verifyToken(token: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
