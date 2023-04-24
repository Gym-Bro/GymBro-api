import { HttpException, Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFirebaseRepository } from 'src/infrastructure/firebase/repositories/userFirebaseRepository';
import { UUIDVersion } from 'class-validator';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

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
    uuid: UUIDVersion,
    idToken: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photo_url'>
    | HttpException
  > {
    //return `This action returns a #${uuid} user with tokenId: ${idToken}`;
    const result = await this.firebaseService.auth.verifyIdToken(idToken);
    if (result.uid) return this.userRepository.findById(uuid.toString());
    return null;
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${uuid} user`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} user`;
  }
}
