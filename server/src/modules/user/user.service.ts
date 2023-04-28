import { HttpException, Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFirebaseRepository } from 'infrastructure/firebase/repositories/userFirebaseRepository';
import { FirebaseService } from 'infrastructure/firebase/firebase.service';

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
    'uuid' | 'first_name' | 'last_name' | 'email' | 'photo_url'
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
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photo_url'>
    | HttpException
  > {
    const result = await this.firebaseService.auth.verifyIdToken(idToken);
    if (result.uid) return this.userRepository.findByEmail(email);
    return null;
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${email} user with: ${JSON.stringify(
      updateUserDto,
    )}`;
  }

  remove(email: string) {
    return `This action removes a #${email} user`;
  }
}
