import { OmitType, PartialType } from '@nestjs/mapped-types';
import { RegisterUserRequestDto } from './register-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
  ValidateIf,
} from 'class-validator';
import { PasswordMatchConstraint } from 'utils/validators.utils';
import { MESSAGES } from 'utils/messages.utils';
import { REGEX } from 'utils/regex.utils';

export class EmailResetDto extends PartialType(
  OmitType(RegisterUserRequestDto, [
    'first_name',
    'last_name',
    'photoURL',
    'confirm',
  ]),
) {
  @IsEmail()
  @IsNotEmpty()
  new_email: string;

  @IsOptional()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  new_password: string;

  @ValidateIf((o) => o.new_password !== undefined)
  @IsString()
  @IsOptional()
  @Validate(PasswordMatchConstraint, ['new_password'], {
    message: MESSAGES.PASSWORD_MATCH_MESSAGE,
  })
  new_password_confirm: string;
}
