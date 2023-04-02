import { Body, Controller, Headers, Post } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() body: Pick<User, 'email' | 'password'>) {
    return this.authService.login(body.email, body.password);
    // return 'Hola desde login';
  }

  @Post('register')
  public register(
    @Body() body: Omit<User, 'id'>,
    @Headers('Authorization') authHeader: string,
  ) {
    const idToken = authHeader.split('Bearer ')[1];
    console.log(idToken);
    return this.authService.register(body, idToken);
    // return 'Hola desde register';
  }
}
