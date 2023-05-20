import { Injectable } from '@nestjs/common';
import { UserAuthRepository } from 'modules/user/repositories/userAuth.repository';
import { FirebaseService } from '../firebase.service';
import { auth } from 'firebase-admin';
import { RegisterUserRequestDto } from 'modules/user/dto/register-user.dto';
import { UserRecord } from 'firebase-functions/v1/auth';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthFirebaseRepository implements UserAuthRepository {
  private readonly userAuth: auth.Auth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.userAuth = this.firebaseService.auth;
  }

  async createCustomToken(uid: string): Promise<string> {
    return await this.userAuth.createCustomToken(uid);
    throw new Error('Method not implemented.');
  }

  async getUser(uid: string): Promise<UserRecord> {
    return await this.userAuth.getUser(uid);
  }

  async resetEmailAndPassword(
    uid: string,
    newEmail: string,
    newPassword?: string,
  ): Promise<UserRecord> {
    const result = await this.userAuth.updateUser(uid, {
      email: newEmail,
      password: newPassword,
    });
    return result;
  }

  async register(registerUser: RegisterUserRequestDto): Promise<UserRecord> {
    const result = await this.userAuth.createUser({
      email: registerUser.email,
      password: registerUser.password,
    });
    if (result.uid) return result;
    else throw Error('Cannot register user in Firebase!');
  }
  async login(email: string, password: string): Promise<UserRecord> {
    const result = await this.userAuth.getUserByEmail(email);
    if (bcrypt.compare(password, result.passwordHash)) return result;
    else throw new Error('Password or email not match!');
  }
  async verifyToken(token: string): Promise<any> {
    return await this.userAuth.verifyIdToken(token);
  }
}
