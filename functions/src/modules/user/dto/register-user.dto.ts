import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { PasswordMatchConstraint } from './../../../utils/validators.utils';
import { MESSAGES } from './../../../utils/messages.utils';
import { REGEX } from './../../../utils/regex.utils';

export class RegisterUserRequestDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  display_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsString()
  @Validate(PasswordMatchConstraint, ['password'], {
    message: MESSAGES.PASSWORD_MATCH_MESSAGE,
  })
  confirm: string;

  @IsUrl()
  @IsOptional()
  photoURL: string;
}
