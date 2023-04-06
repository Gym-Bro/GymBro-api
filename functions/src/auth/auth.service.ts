import { Injectable } from '@nestjs/common';
import { User } from '../modules/user/entities/user.entity';
import { UserService } from '../modules/user/user.service';
import { FirebaseService } from './../firebase/firebase.service';
import { RegisterUserRequestDto } from '../modules/user/dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {}

  public async register(
    registerUser: RegisterUserRequestDto,
    idToken,
  ): Promise<Pick<
    User,
    'first_name' | 'last_name' | 'email' | 'photo_url'
  > | null> {
    try {
      const result = await this.firebaseService.auth.verifyIdToken(idToken);
      if (result.email === registerUser.email) {
        return await this.userService.create(registerUser);
      }
      return null;
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
