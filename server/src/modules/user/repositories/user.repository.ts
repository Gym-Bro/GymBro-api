import { HttpException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ICRUD } from 'utils/interfaces/ICRUD';

export interface UserRepository extends ICRUD<User> {
  findByEmail(email: string): Promise<User | null>;
}
