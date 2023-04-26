import { IEntity } from 'utils/interfaces/IEntity';
import { RegisterUserRequestDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { createHash } from 'crypto';
import { UUIDVersion } from 'class-validator';
import { HttpException } from '@nestjs/common';
export class User extends IEntity {
  first_name: string = null;
  last_name: string = null;
  email: string = null;
  password: string = null;
  photo_url: string = null;
  providerId: string = null;

  constructor(registerUser: RegisterUserRequestDto) {
    super();
    this.email = registerUser.email;
    this.first_name = registerUser.first_name;
    this.last_name = registerUser.last_name;
    this.password = this.encryptPassword(
      registerUser.password,
      'sha256',
      'hex',
    );
    this.photo_url = registerUser.photoURL || null;
    this.providerId = registerUser.providerId;
  }

  private encryptPassword(password, algoritm, digest) {
    const hash = createHash(algoritm).update(password).digest(digest);
    return hash;
  }
}

export interface UserRepository {
  findById(
    uuid: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photo_url'>
    | HttpException
  >;
  findByEmail(email: string): Promise<User | null>;
  create(
    user: User,
  ): Promise<Pick<
    User,
    'first_name' | 'last_name' | 'email' | 'photo_url'
  > | null>;
  update(uuid: string, updateProductDto: UpdateUserDto): Promise<User | null>;
  delete(uuid: string): Promise<User | null>;
}
