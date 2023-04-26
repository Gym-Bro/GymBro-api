import { Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFirebaseRepository } from 'infrastructure/firebase/repositories/userFirebaseRepository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserFirebaseRepository) {}
  async create(
    registerUser: RegisterUserRequestDto,
  ): Promise<Pick<
    User,
    'first_name' | 'last_name' | 'email' | 'photo_url'
  > | null> {
    const user = new User(registerUser);
    return await this.userRepository.create(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
