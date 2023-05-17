import { HttpException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface UserRepository {
  findById(
    uuid: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  >;
  findByEmail(
    email: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  >;
  create(
    user: User,
  ): Promise<Pick<
    User,
    'first_name' | 'last_name' | 'email' | 'photoURL'
  > | null>;
  update(
    uuid: string,
    updateProductDto: UpdateUserDto,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  >;
  delete(uuid: string): Promise<User | null>;
}
