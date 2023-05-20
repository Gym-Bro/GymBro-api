import { OmitType, PartialType } from '@nestjs/mapped-types';
import { RegisterUserRequestDto } from './register-user.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate,
} from 'class-validator';
import { IsOlderThan15 } from 'utils/validators.utils';
export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserRequestDto, [
    'password',
    'confirm',
    'email',
    'providerId',
  ]),
) {
  @IsDateString()
  @IsOptional()
  @Validate(IsOlderThan15)
  birth_date?: string;

  @IsString()
  @IsPhoneNumber()
  phone_number: string;
}
