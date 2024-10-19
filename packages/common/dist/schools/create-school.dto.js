'use strict';

var chunkEUXUH3YW_js = require('../chunk-EUXUH3YW.js');
var classValidator = require('class-validator');

class CreateSchoolDTO {
}
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty()
], CreateSchoolDTO.prototype, "address", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty()
], CreateSchoolDTO.prototype, "name", 2);

exports.CreateSchoolDTO = CreateSchoolDTO;
//# sourceMappingURL=create-school.dto.js.map
//# sourceMappingURL=create-school.dto.js.map