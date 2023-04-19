import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_VALIDATION = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const VALIDATIONS = { PASSWORD_VALIDATION };
