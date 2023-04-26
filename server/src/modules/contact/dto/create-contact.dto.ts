import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'The title can only contain letters and spaces',
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  title: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'The name can only contain letters and spaces',
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  body: string;
}
