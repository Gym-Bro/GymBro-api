import { HttpException, Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserClean } from './entities/user.entity';
import { UserFirebaseRepository } from 'infrastructure/firebase/repositories/userFirebaseRepository';
import { FirebaseService } from 'infrastructure/firebase/firebase.service';
import { AuthFirebaseRepository } from 'infrastructure/firebase/repositories/authFirebaseRepository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserFirebaseRepository,
    private readonly firebaseService: FirebaseService,
    private readonly userAuthentication: AuthFirebaseRepository,
    private readonly mailingService: MailerService,
  ) {}

  async create(
    registerUser: RegisterUserRequestDto,
  ): Promise<UserClean | null> {
    try {
      const user = await this.userAuthentication.register(registerUser);
      const result = await this.userRepository.create(user);
      await this.mailingService.sendMail({
        from: 'admin@gymbro.com',
        to: user.email,
        subject: 'Welcome to gymbro',
      });
      return result;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(
    email: string,
    idToken: string,
  ): Promise<
    | Pick<User, 'uuid' | 'first_name' | 'last_name' | 'email' | 'photoURL'>
    | HttpException
  > {
    const result = await this.firebaseService.auth.verifyIdToken(idToken);
    if (result.uid) return this.userRepository.findByEmail(email);
    return null;
  }

  async update(idToken: string, email: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.firebaseService.auth.verifyIdToken(idToken);
      if (result.uid)
        return await this.userRepository.update(email, updateUserDto);
      return null;
    } catch (error) {
      return error;
    }
  }

  remove(email: string) {
    return `This action removes a #${email} user`;
  }
}
