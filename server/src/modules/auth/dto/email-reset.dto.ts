import { OmitType, PartialType } from '@nestjs/mapped-types';
import { RegisterUserRequestDto } from './register-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailResetDto extends PartialType(
  OmitType(RegisterUserRequestDto, ['first_name', 'last_name', 'photoURL']),
) {
  @IsEmail()
  @IsNotEmpty()
  new_email: string;
}
