import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'myStrongPassword123!',
    description: 'The password of the user',
    minLength: 8,
    maxLength: 24,
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    example: 'myStrongPassword123!',
    description: 'The confirmation password of the user',
  })
  @IsString()
  @Validate(PasswordMatchConstraint, ['password'], {
    message: MESSAGES.PASSWORD_MATCH_MESSAGE,
  })
  confirm: string;

  @ApiProperty({
    example: 'https://www.example.com/photo.jpg',
    description: 'The URL for the user photo',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  photoURL: string;

  @ApiProperty({
    example: 'google',
    description: 'The ID of the user provider',
  })
  @IsString()
  @IsNotEmpty()
  providerId: string;
}
