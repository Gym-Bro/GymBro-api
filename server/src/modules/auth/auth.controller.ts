import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { EmailResetDto } from './dto/email-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(
    @Body() body: Pick<RegisterUserRequestDto, 'email'>,
    @Headers('Authorization') authHeader: string,
  ) {
    const idToken = authHeader.split('Bearer ')[1];
    return this.authService.login(body.email, idToken);
    // return 'Hola desde login';
  }

  @Post('register')
  public register(
    @Body() registerUser: RegisterUserRequestDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const idToken = authHeader.split('Bearer ')[1];
    return this.authService.register(registerUser, idToken);
  }

  @Post('resetEmail')
  public resetEmail(
    @Body()
    emailResetUser: EmailResetDto,

    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const idToken = authHeader?.split('Bearer ')[1];
      if (idToken) return this.authService.resetEmail(emailResetUser, idToken);
      else
        throw new HttpException(
          'you must provide an id token in header request',
          HttpStatus.UNAUTHORIZED,
        );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
