'use strict';

var chunkEUXUH3YW_js = require('../chunk-EUXUH3YW.js');
var classValidator = require('class-validator');

class LoginEmailDTO {
}
chunkEUXUH3YW_js.__decorateClass([
  classValidator.MinLength(8, {
    message: "La contrase\xF1a debe tener 8 caracteres como minimo"
  })
], LoginEmailDTO.prototype, "password", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.MinLength(1),
  classValidator.IsEmail({}, { message: "Email con formato incorrecto" })
], LoginEmailDTO.prototype, "email", 2);

exports.LoginEmailDTO = LoginEmailDTO;
//# sourceMappingURL=login-password.dto.js.map
//# sourceMappingURL=login-password.dto.js.map