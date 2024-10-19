import '../../chunk-SAWN7RJP.mjs';
import { registerDecorator } from 'class-validator';
import { CUIL_LENGTH } from '../../constants';

class IsValidCuilConstraint {
  validate(cuil) {
    if (cuil.length !== CUIL_LENGTH) {
      return false;
    }
    const [checkDigit, ...rest] = cuil.split("").map(Number).reverse();
    const total = rest.reduce(
      (acc, cur, index) => acc + cur * (2 + index % 6),
      0
    );
    const mod11 = CUIL_LENGTH - total % CUIL_LENGTH;
    if (mod11 === CUIL_LENGTH) {
      return checkDigit === 0;
    }
    if (mod11 === 10) {
      return false;
    }
    return checkDigit === mod11;
  }
  defaultMessage(validationArguments) {
    return "Invalid CUIL";
  }
}
function IsValidCuil(property, validationOptions) {
  return (object, propertyName) => {
    registerDecorator({
      name: "IsValidCuil",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidCuilConstraint
    });
  };
}

export { IsValidCuil, IsValidCuilConstraint };
//# sourceMappingURL=validate-cuil.pipe.mjs.map
//# sourceMappingURL=validate-cuil.pipe.mjs.map