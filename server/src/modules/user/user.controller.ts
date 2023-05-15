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
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserRequestDto } from '../auth/dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() registerUser: RegisterUserRequestDto) {
    return this.userService.create(registerUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  findOne(
    @Param('email') email: string,
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const idToken = authHeader?.split('Bearer ')[1];
      if (idToken) return this.userService.findOne(email, idToken);
      else throw new HttpException('No token id provided', 400);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Patch(':email')
  update(
    @Param('email') email: string,
    @Headers('Authorization') authHeader: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const idToken = authHeader?.split('Bearer ')[1];
      if (idToken)
        return this.userService.update(idToken, email, updateUserDto);
      else throw new HttpException('No token id provided', 400);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.userService.remove(uuid);
  }
}
