import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return (
      typeof value === 'string' &&
      typeof relatedValue === 'string' &&
      value === relatedValue
    );
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} and ${args.property} do not match`;
  }
}

@ValidatorConstraint({ name: 'isOlderThan15', async: false })
export class IsOlderThan15 implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const birthDate = new Date(date);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - birthDate.getTime();
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    return diffInYears >= 15;
  }

  defaultMessage(args: ValidationArguments) {
    return 'You must be older than 15';
  }
}
