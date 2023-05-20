import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailResetDto } from './dto/reset-email.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(
    @Body() registerUser: RegisterUserRequestDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const idToken = authHeader?.split('Bearer ')[1];
    if (idToken) return this.userService.signUp(registerUser, idToken);
    else throw new HttpException('No token id provided', 400);
  }

  @Post('resetEmail')
  public resetEmail(
    @Body()
    emailResetUser: EmailResetDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const idToken = authHeader?.split('Bearer ')[1];
    if (idToken)
      return this.userService.resetEmailUser(emailResetUser, idToken);
    else
      throw new HttpException(
        'you must provide an id token in header request',
        HttpStatus.UNAUTHORIZED,
      );
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uid')
  findOne(
    @Param('uid') uid: string,
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const idToken = authHeader?.split('Bearer ')[1];
      if (idToken) return this.userService.getProfile(uid, idToken);
      else throw new HttpException('No token id provided', 400);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Patch(':uid')
  update(
    @Param('uid') uid: string,
    @Headers('Authorization') authHeader: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const idToken = authHeader?.split('Bearer ')[1];
      if (idToken)
        return this.userService.updateProfile(idToken, uid, updateUserDto);
      else throw new HttpException('No token id provided', 400);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.userService.unsuscribe(uid);
  }
}
