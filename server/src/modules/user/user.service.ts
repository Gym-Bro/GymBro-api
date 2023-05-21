import { Injectable } from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFirebaseRepository } from 'infrastructure/firebase/repositories/userFirebaseRepository';
import { AuthFirebaseRepository } from 'infrastructure/firebase/repositories/authFirebaseRepository';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailResetDto } from './dto/reset-email.dto';
import { getPublicData, setUpdatedDate } from './helpers/getPublicData.helper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserFirebaseRepository,
    private readonly userAuthentication: AuthFirebaseRepository,
    private readonly mailingService: MailerService,
  ) {}

  async signUp(
    registerUser: RegisterUserRequestDto,
    tokenId: string,
  ): Promise<object | null> {
    const decodedToken = await this.userAuthentication.verifyToken(tokenId);
    const userAuth = await this.userAuthentication.getUser(decodedToken.uid);
    if (decodedToken.uid) {
      const user = new User(registerUser);
      for (let key in userAuth) {
        user[key] = userAuth[key];
      }
      await this.userRepository.create(user);
      await this.mailingService.sendMail({
        from: 'admin@gymbro.com',
        to: userAuth.email,
        subject: 'Welcome to gymbro',
      });
      return getPublicData(user);
    }
    return null;
  }

  findAll() {
    return `This action returns all user`;
  }

  async getProfile(uid: string, idToken: string): Promise<object | null> {
    const result = await this.userAuthentication.verifyToken(idToken);
    if (result.uid) {
      const user = await this.userRepository.findById(uid);
      return getPublicData(user);
    }

    return null;
  }

  async updateProfile(
    idToken: string,
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<object | null> {
    const result = await this.userAuthentication.verifyToken(idToken);
    if (result.uid) {
      const user = await this.userRepository.findById(result.uid);
      for (let key in updateUserDto) {
        user[key] = updateUserDto[key];
      }
      const updatedUser = setUpdatedDate(user);
      return getPublicData(
        await this.userRepository.update(updatedUser.uid, updatedUser),
      );
    }
    return null;
  }

  unsuscribe(email: string) {
    return `This action removes a #${email} user`;
  }

  async resetEmailUser(
    resetEmailDto: EmailResetDto,
    idToken: string,
  ): Promise<object | null> {
    const result = await this.userAuthentication.verifyToken(idToken);
    if (result.uid) {
      //check password...
      const userAuth = await this.userAuthentication.resetEmailAndPassword(
        result.uid,
        resetEmailDto.new_email,
        resetEmailDto.new_password,
      );
      const link = await this.userAuthentication.getEmailVerificationLink(
        userAuth.email,
      );
      await this.mailingService.sendMail({
        from: 'admin@gymbro.com',
        to: userAuth.email,
        subject: 'Verify the new email',
        text: link,
      });
      const user = await this.userRepository.findById(result.uid);
      user.email = resetEmailDto.new_email;
      user.password = userAuth.password;
      const updatedUser = setUpdatedDate(user);
      return getPublicData(
        await this.userRepository.update(updatedUser.uid, updatedUser),
      );
    }
  }
}
