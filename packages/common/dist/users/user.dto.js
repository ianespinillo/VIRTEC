'use strict';

var chunkEUXUH3YW_js = require('../chunk-EUXUH3YW.js');
var classValidator = require('class-validator');
var validateCuil_pipe = require('../pipes/validate-cuil/validate-cuil.pipe');

class CreateUserDTO {
}
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsEmail()
], CreateUserDTO.prototype, "email", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNumber()
], CreateUserDTO.prototype, "school_id", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString()
], CreateUserDTO.prototype, "name", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString()
], CreateUserDTO.prototype, "surname", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.MinLength(1),
  classValidator.MaxLength(8)
], CreateUserDTO.prototype, "dni", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString()
], CreateUserDTO.prototype, "address", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString()
], CreateUserDTO.prototype, "birthdate", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  validateCuil_pipe.IsValidCuil("cuil", {
    message: "Please enter a valid CUIL"
  })
], CreateUserDTO.prototype, "cuil", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNumber()
], CreateUserDTO.prototype, "role_id", 2);

exports.CreateUserDTO = CreateUserDTO;
//# sourceMappingURL=user.dto.js.map
//# sourceMappingURL=user.dto.js.map