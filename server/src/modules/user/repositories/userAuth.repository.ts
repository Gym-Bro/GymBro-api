import { RegisterUserRequestDto } from '../dto/register-user.dto';

export interface UserAuthRepository {
  register(registerUser: RegisterUserRequestDto): Promise<any>;
  login(email: string, password: string): Promise<any>;
  verifyToken(token: string): Promise<any>;
  resetEmailAndPassword(
    uid: string,
    newEmail: string,
    newPassword?: string,
  ): Promise<any>;
  createCustomToken(uid: string): Promise<any>;
  getUser(uid: string): Promise<any>;
}
