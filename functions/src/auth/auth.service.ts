import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../modules/user/entities/user.entity';
import { UserService } from '../modules/user/user.service';
import { FirebaseService } from './../firebase/firebase.service';
import { RegisterUserRequestDto } from '../modules/user/dto/register-user.dto';
import { MailingService } from './../mailing/mailing.service';
//import * as fs from 'fs';
import { template } from './../mailing/templates/registration.template';
@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
    private readonly mailingService: MailingService,
  ) {}

  public async register(
    registerUser: RegisterUserRequestDto,
    idToken,
  ): Promise<
    | Pick<User, 'first_name' | 'last_name' | 'email' | 'photo_url'>
    | HttpException
  > {
    try {
      const result = await this.firebaseService.auth.getUserByEmail(
        registerUser.email,
      );
      if (true || result.emailVerified) {
        const user = await this.userService.create(registerUser);
        await this.mailingService.sendEmail({
          from: 'admin@gymbro.com', // Update with valid sender email address
          to: user.email, // Update with valid recipient email address
          subject: 'Registration Mail', // Update with meaningful subject for the email
          text: `Welcome ${user.first_name} ${user.last_name}!!`, // Update with meaningful text body for the email
          html: template, // Update with meaningful HTML body for the email
        });
        return user;
      } else
        throw new HttpException(
          'You must verify your email',
          HttpStatus.UNAUTHORIZED,
        );
      throw new HttpException('User email not match', HttpStatus.CONFLICT);
    } catch (error) {
      return error;
    }
  }

  public async login(email: string, password: string) {
    try {
      // Here we must verify the auth token provided from the client...
    } catch (error) {
      return error;
    }
  }
}
