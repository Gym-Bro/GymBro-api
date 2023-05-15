import { HttpException, Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from '../auth/dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFirebaseRepository } from 'infrastructure/firebase/repositories/userFirebaseRepository';
import { FirebaseService } from 'infrastructure/firebase/firebase.service';
import { EmailResetDto } from 'modules/auth/dto/email-reset.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserFirebaseRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async create(
    registerUser: RegisterUserRequestDto,
  ): Promise<Pick<
    User,
    'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'
  > | null> {
    const user = new User(registerUser);
    return await this.userRepository.create(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(
    email: string,
    idToken: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  > {
    const result = await this.firebaseService.auth.verifyIdToken(idToken);
    if (result.uid) return this.userRepository.findByEmail(email);
    return null;
  }

  async update(idToken: string, email: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.firebaseService.auth.verifyIdToken(idToken);
      if (result.uid)
        return await this.userRepository.update(email, updateUserDto);
      return null;
    } catch (error) {
      return error;
    }
  }

  async resetEmail(
    emailResetUser: EmailResetDto,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  > {
    try {
      return await this.userRepository.resetEmail(
        emailResetUser.email,
        emailResetUser,
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  remove(email: string) {
    return `This action removes a #${email} user`;
  }
}
