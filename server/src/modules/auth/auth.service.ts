import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { User } from '../user/entities/user.entity';
import { template } from '../../infrastructure/mailing/templates/registration.template';
import { FirebaseService } from 'infrastructure/firebase/firebase.service';
import { MailingService } from 'infrastructure/mailing/mailing.service';
import { EmailResetDto } from './dto/email-reset.dto';
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
    | Pick<User, 'first_name' | 'last_name' | 'email' | 'photoURL'>
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
        const emailVerificationLink =
          await this.firebaseService.auth.generateEmailVerificationLink(
            user.email,
          );
        user['emailVerificationLink'] = emailVerificationLink;
        return user;
      } else {
        throw new HttpException('User email not match', HttpStatus.CONFLICT);
      }
    } catch (error) {
      return error;
    }
  }

  public async login() {}

  public async resetEmail(emailResetUser: EmailResetDto, idToken: string) {
    try {
      const userAuth = await this.firebaseService.auth.getUserByEmail(
        emailResetUser.email,
      );

      await this.userService.checkPassword(
        emailResetUser.email,
        emailResetUser.password,
      );

      await this.firebaseService.auth.updateUser(userAuth.uid, {
        email: emailResetUser.new_email,
        emailVerified: false,
        password: emailResetUser.new_password,
      });

      const verificationLink =
        await this.firebaseService.auth.generateEmailVerificationLink(
          emailResetUser.new_email,
        );
      const resetUser = await this.userService.resetEmail(emailResetUser);

      await this.mailingService.sendEmail({
        from: 'admin@gymbro.com', // Update with valid sender email address
        to: emailResetUser.new_email, // Update with valid recipient email address
        subject: 'New email user', // Update with meaningful subject for the email
        text: `Dear ${resetUser.first_name} ${resetUser.last_name}, 
        your new email has been changed succesfully. 
        Please verify your account with the following 
        link: ${verificationLink}`, // Update with meaningful text body for the email
        html: template, // Update with meaningful HTML body for the email
      });

      return { resetUser, verificationLink };
    } catch (error) {
      return error;
    }
  }
}
