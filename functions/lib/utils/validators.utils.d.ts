import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class PasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
