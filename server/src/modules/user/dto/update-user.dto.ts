import { OmitType, PartialType } from '@nestjs/mapped-types';
import { RegisterUserRequestDto } from './register-user.dto';
import { IsDateString, IsOptional, Validate } from 'class-validator';
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
}
