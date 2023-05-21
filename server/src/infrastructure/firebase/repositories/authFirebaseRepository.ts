import { Injectable } from '@nestjs/common';
import { UserAuthRepository } from 'modules/user/repositories/userAuth.repository';
import { FirebaseService } from '../firebase.service';
import { auth } from 'firebase-admin';
import { RegisterUserRequestDto } from 'modules/user/dto/register-user.dto';
import { UserRecord } from 'firebase-functions/v1/auth';
import * as bcrypt from 'bcrypt';
import { User } from 'modules/user/entities/user.entity';
import { UserAuth } from 'modules/user/entities/userAuth.entity';

@Injectable()
export class AuthFirebaseRepository implements UserAuthRepository {
  private readonly userAuth: auth.Auth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.userAuth = this.firebaseService.auth;
  }

  async getEmailVerificationLink(email: string): Promise<string> {
    return await this.userAuth.generateEmailVerificationLink(email);
    throw new Error('Method not implemented.');
  }

  async createCustomToken(uid: string): Promise<string> {
    return await this.userAuth.createCustomToken(uid);
    throw new Error('Method not implemented.');
  }

  async getUser(uid: string): Promise<UserAuth> {
    return firebaseAuthToUserAuth(
      new UserAuth(),
      await this.userAuth.getUser(uid),
    );
  }

  async resetEmailAndPassword(
    uid: string,
    newEmail: string,
    newPassword?: string,
  ): Promise<UserAuth> {
    return firebaseAuthToUserAuth(
      new UserAuth(),
      await this.userAuth.updateUser(uid, {
        email: newEmail,
        password: newPassword,
      }),
    );
  }

  async register(registerUser: RegisterUserRequestDto): Promise<UserAuth> {
    return firebaseAuthToUserAuth(
      new UserAuth(),
      await this.userAuth.createUser({
        email: registerUser.email,
        password: registerUser.password,
      }),
    );
  }
  async login(email: string, password: string): Promise<any> {
    const result = await this.userAuth.getUserByEmail(email);
    if (bcrypt.compare(password, result.passwordHash)) return result;
    else throw new Error('Password or email not match!');
  }
  async verifyToken(token: string): Promise<any> {
    return await this.userAuth.verifyIdToken(token);
  }
}

function firebaseAuthToUserAuth(
  userAuth: UserAuth,
  firebaseAuth: UserRecord,
): UserAuth {
  userAuth.uid = firebaseAuth.uid;
  userAuth.email = firebaseAuth.email;
  userAuth.password = firebaseAuth.passwordHash;
  userAuth.providerData = firebaseAuth.providerData.map((u) => u.providerId);
  userAuth.created_date = firebaseAuth.metadata.creationTime;
  return userAuth;
}
