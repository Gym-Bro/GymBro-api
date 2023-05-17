import { IEntity } from 'utils/interfaces/IEntity';
import { RegisterUserRequestDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { createHash } from 'crypto';

export class User extends IEntity {
  first_name: string = null;
  last_name: string = null;
  email: string = null;
  password: string = null;
  photoURL: string = null;
  providerId: string = null;
  birth_date: Date = null;

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
    this.photoURL = registerUser.photoURL || null;
    this.providerId = registerUser.providerId;
  }

  private encryptPassword(password, algoritm, digest) {
    const hash = createHash(algoritm).update(password).digest(digest);
    return hash;
  }
}

export class UserClean {
  uuid: string = null;
  first_name: string = null;
  last_name: string = null;
  email: string = null;
  photoURL: string = null;
  birth_date: Date = null;

  constructor(user: User) {
    this.uuid = user.uuid;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.photoURL = user.photoURL;
    this.birth_date = user.birth_date;
  }
}
