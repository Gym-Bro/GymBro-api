import { IEntity } from 'utils/interfaces/IEntity';
import { RegisterUserRequestDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { createHash } from 'crypto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class User extends IEntity {
  first_name: string = null;
  last_name: string = null;
  email: string = null;
  password: string = null;
  photoURL: string = null;
  providerId: string = null;
  birth_date: Date = null;
  phone_number: string = null;

  constructor(registerUser: Omit<RegisterUserRequestDto, 'confirm'>) {
    super();
    this.email = registerUser.email;
    this.first_name = registerUser.first_name;
    this.last_name = registerUser.last_name;
    this.photoURL = registerUser.photoURL || null;
    this.providerId = registerUser.providerId;
  }

  encryptPassword(password, algoritm, digest) {
    const hash = createHash(algoritm).update(password).digest(digest);
    return hash;
  }

  getPublicData() {
    return {
      uid: this.uid,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      photoURL: this.photoURL,
      birth_date: this.birth_date,
      phone_number: this.phone_number,
    };
  }
}
