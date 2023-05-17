import { RegisterUserRequestDto } from '../dto/register-user.dto';
import { UserClean } from '../entities/user.entity';

export interface UserAuthRepository {
  register(registerUser: RegisterUserRequestDto): Promise<UserClean>;
  login(email: string, password: string): Promise<UserClean | null>;
  verifyToken(token: string): Promise<boolean>;
}
