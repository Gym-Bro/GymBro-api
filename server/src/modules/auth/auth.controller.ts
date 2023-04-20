import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserRequestDto } from '../user/dto/register-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
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

  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Before making a request to this endpoint, send a POST request to your authentication endpoint to obtain an authentication token. Include the authentication token in the headers of the request to this endpoint. Provide the required information in the body of the request, using the RegisterUserRequestDto schema.',
  })
  @ApiBody({
    type: RegisterUserRequestDto,
    description: 'The data required to register a new user.',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token with the format "Bearer {token}"',
  })
  @Post('register')
  public register(
    @Body() registerUser: RegisterUserRequestDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const idToken = authHeader.split('Bearer ')[1];
    return this.authService.register(registerUser, idToken);
  }
}
