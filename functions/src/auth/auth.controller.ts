import { Body, Controller, Headers, Post } from '@nestjs/common';
import { RegisterUserRequestDto } from './../modules/user/dto/register-user.dto';
import { AuthService } from './auth.service';

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
}
