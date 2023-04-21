import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import { UserService } from '../user/user.service';
import { MailingService } from 'src/infrastructure/mailing/mailing.service';
import { RegisterUserRequestDto } from '../user/dto/register-user.dto';
import { User } from '../user/entities/user.entity';
import { template } from '../../infrastructure/mailing/templates/registration.template';
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
      const result = await this.firebaseService.auth.verifyIdToken(idToken);
      if (result.uid) {
        const user = await this.userService.create(registerUser);
        await this.mailingService.sendEmail({
          from: 'admin@gymbro.com', // Update with valid sender email address
          to: user.email, // Update with valid recipient email address
          subject: 'Registration Mail', // Update with meaningful subject for the email
          text: `Welcome ${user.first_name} ${user.last_name}!!`, // Update with meaningful text body for the email
          html: template, // Update with meaningful HTML body for the email
        });
        return user;
      } else {
        throw new HttpException('User email not match', HttpStatus.CONFLICT);
      }
    } catch (error) {
      return error;
    }
  }

  public async login(
    email: string,
    idToken: string,
  ): Promise<
    | Pick<User, 'first_name' | 'last_name' | 'email' | 'photo_url'>
    | HttpException
  > {
    try {
      // Here we must verify the auth token provided from the client and that the user exist in the db firestore
      await this.firebaseService.auth.verifyIdToken(idToken);
      const userQuery = await this.firebaseService.firestore
        .collection('users')
        .where('email', '==', email)
        .get();
      if (userQuery.empty) {
        throw new HttpException('email user not found', HttpStatus.NOT_FOUND);
      }
      const { first_name, last_name, photo_url } = userQuery.docs[0].data();
      return { email, first_name, last_name, photo_url };
    } catch (error) {
      if (error instanceof HttpException) {
        return error;
      } else if (error.code === 'auth/argument-error') {
        return new HttpException('Invalid ID token', HttpStatus.BAD_REQUEST);
      } else {
        return new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}