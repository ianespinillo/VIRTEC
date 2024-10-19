'use strict';

var chunkEUXUH3YW_js = require('../chunk-EUXUH3YW.js');
var classValidator = require('class-validator');

class LoginDniDTO {
}
chunkEUXUH3YW_js.__decorateClass([
  classValidator.MinLength(8),
  classValidator.Length(8, 8, {
    message: "El DNI debe tener 8 caracteres"
  })
], LoginDniDTO.prototype, "dni", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.MinLength(8, {
    message: "La contrase\xF1a debe tener 8 caracteres como minimo"
  })
], LoginDniDTO.prototype, "password", 2);

exports.LoginDniDTO = LoginDniDTO;
//# sourceMappingURL=login-dni.dto.js.map
//# sourceMappingURL=login-dni.dto.js.map