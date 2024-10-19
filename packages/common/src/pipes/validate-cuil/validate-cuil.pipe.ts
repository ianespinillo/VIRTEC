import {
	type ValidationArguments,
	type ValidationOptions,
	type ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';
import { CUIL_LENGTH } from '../../constants';

export class IsValidCuilConstraint implements ValidatorConstraintInterface {
	validate(cuil: string) {
		if (cuil.length !== CUIL_LENGTH) {
			return false;
		}
		const [checkDigit, ...rest] = cuil.split('').map(Number).reverse();
		const total = rest.reduce(
			(acc, cur, index) => acc + cur * (2 + (index % 6)),
			0,
		);

		const mod11 = CUIL_LENGTH - (total % CUIL_LENGTH);

		if (mod11 === CUIL_LENGTH) {
			return checkDigit === 0;
		}

		if (mod11 === 10) {
			return false;
		}

		return checkDigit === mod11;
	}
	defaultMessage(validationArguments?: ValidationArguments): string {
		return 'Invalid CUIL';
	}
}

export function IsValidCuil(
	property: string,
	validationOptions?: ValidationOptions,
) {
	// biome-ignore lint/complexity/noBannedTypes: Class-validator type is not supported
	return (object: Object, propertyName: string) => {
		registerDecorator({
			name: 'IsValidCuil',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: IsValidCuilConstraint,
		});
	};
}
