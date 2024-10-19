import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';

declare class IsValidCuilConstraint implements ValidatorConstraintInterface {
    validate(cuil: string): boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
declare function IsValidCuil(property: string, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;

export { IsValidCuil, IsValidCuilConstraint };
