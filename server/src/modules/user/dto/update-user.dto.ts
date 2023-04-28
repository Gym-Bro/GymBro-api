import { PickType } from '@nestjs/mapped-types';
import { RegisterUserRequestDto } from './register-user.dto';
import { IsDateString, IsOptional, Validate } from 'class-validator';
import { IsOlderThan15 } from 'utils/validators.utils';

export class UpdateUserDto extends PickType(RegisterUserRequestDto, [
  'first_name',
  'last_name',
  'photoURL',
]) {
  @IsDateString()
  @IsOptional()
  @Validate(IsOlderThan15)
  birth_date: string;
}
