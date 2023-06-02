import { IEntity } from 'utils/interfaces/IEntity';
import { RegisterUserRequestDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { createHash } from 'crypto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class User extends IEntity {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  photoURL: string;
  providerId: string;
  birth_date: Date;
  phone_number: string;

  constructor() {
    super();
    this.email = null;
    this.first_name = null;
    this.last_name = null;
    this.photoURL = null;
    this.providerId = null;
    this.phone_number = null;
    this.password = null;
  }
}
