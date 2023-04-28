import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserRequestDto } from './dto/register-user.dto';
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
    const idToken = authHeader.split('Bearer ')[1];
    return this.userService.findOne(email, idToken);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.userService.remove(uuid);
  }
}
