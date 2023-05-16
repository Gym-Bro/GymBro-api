import { IEntity } from 'utils/interfaces/IEntity';
import { RegisterUserRequestDto } from '../../auth/dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { createHash } from 'crypto';
import { UUIDVersion } from 'class-validator';
import { HttpException } from '@nestjs/common';
import { EmailResetDto } from 'modules/auth/dto/email-reset.dto';
export class User extends IEntity {
  first_name: string = null;
  last_name: string = null;
  email: string = null;
  password: string = null;
  photoURL: string = null;
  providerId: string = null;
  birth_date: Date = null;

  constructor(registerUser: Omit<RegisterUserRequestDto, 'confirm'>) {
    super();
    this.email = registerUser.email;
    this.first_name = registerUser.first_name;
    this.last_name = registerUser.last_name;
    this.password = this.encryptPassword(
      registerUser.password,
      'sha256',
      'hex',
    );
    this.photoURL = registerUser.photoURL || null;
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
    updateUserDto: UpdateUserDto,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  >;
  resetEmail(
    email: string,
    emailResetUser: EmailResetDto,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  >;
  delete(uuid: string): Promise<User | null>;
  checkPassword(
    email: string,
    password: string,
  ): Promise<boolean | HttpException>;
}
