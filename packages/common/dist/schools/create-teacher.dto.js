'use strict';

var chunkEUXUH3YW_js = require('../chunk-EUXUH3YW.js');
var classValidator = require('class-validator');
var user_dto = require('../users/user.dto');

class CreateTeacherDTO extends user_dto.CreateUserDTO {
}
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNotEmpty()
], CreateTeacherDTO.prototype, "file_n", 2);

exports.CreateTeacherDTO = CreateTeacherDTO;
//# sourceMappingURL=create-teacher.dto.js.map
//# sourceMappingURL=create-teacher.dto.js.map