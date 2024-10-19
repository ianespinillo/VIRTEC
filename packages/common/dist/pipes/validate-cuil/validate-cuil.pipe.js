'use strict';

require('../../chunk-EUXUH3YW.js');
var classValidator = require('class-validator');
var constants = require('../../constants');

class IsValidCuilConstraint {
  validate(cuil) {
    if (cuil.length !== constants.CUIL_LENGTH) {
      return false;
    }
    const [checkDigit, ...rest] = cuil.split("").map(Number).reverse();
    const total = rest.reduce(
      (acc, cur, index) => acc + cur * (2 + index % 6),
      0
    );
    const mod11 = constants.CUIL_LENGTH - total % constants.CUIL_LENGTH;
    if (mod11 === constants.CUIL_LENGTH) {
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
    classValidator.registerDecorator({
      name: "IsValidCuil",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidCuilConstraint
    });
  };
}

exports.IsValidCuil = IsValidCuil;
exports.IsValidCuilConstraint = IsValidCuilConstraint;
//# sourceMappingURL=validate-cuil.pipe.js.map
//# sourceMappingURL=validate-cuil.pipe.js.map