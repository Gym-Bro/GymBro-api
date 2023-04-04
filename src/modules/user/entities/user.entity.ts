import { RegisterUserRequestDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export class User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  //uuid: string;

  constructor(registerUser: RegisterUserRequestDto) {
    this.email = registerUser.email;
    this.first_name = registerUser.first_name;
    this.last_name = registerUser.last_name;
    this.password = registerUser.password; // encrypt the password
    // generate uuid
  }
}

export interface UserRepository {
  findById(uuid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User | null>;
  update(uuid: string, updateProductDto: UpdateUserDto): Promise<User | null>;
  delete(uuid: string): Promise<User | null>;
}
