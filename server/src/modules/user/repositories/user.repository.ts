import { HttpException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface UserRepository {
  findById(uid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User | null>;
  update(uid: string, user: User): Promise<User | null>;
  delete(uid: string): Promise<any | null>;
}
