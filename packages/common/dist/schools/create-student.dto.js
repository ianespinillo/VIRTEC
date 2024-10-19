'use strict';

var chunkEUXUH3YW_js = require('../chunk-EUXUH3YW.js');
var user_dto = require('../users/user.dto');
var classValidator = require('class-validator');

class CreateStudentDTO extends user_dto.CreateUserDTO {
}
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNumber()
], CreateStudentDTO.prototype, "id_course", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNumber()
], CreateStudentDTO.prototype, "id_school_period", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty()
], CreateStudentDTO.prototype, "n_legajo", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty()
], CreateStudentDTO.prototype, "origin_school", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNumber()
], CreateStudentDTO.prototype, "id_next_course", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsBoolean()
], CreateStudentDTO.prototype, "partial_debt", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsBoolean()
], CreateStudentDTO.prototype, "equivalences", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsBoolean()
], CreateStudentDTO.prototype, "differenced_circuit", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsOptional()
], CreateStudentDTO.prototype, "previa_1_id", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsOptional()
], CreateStudentDTO.prototype, "previa_2_id", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty()
], CreateStudentDTO.prototype, "name_responsable", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty()
], CreateStudentDTO.prototype, "surname_responsable", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString()
], CreateStudentDTO.prototype, "cuil_responsable", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.Length(10, 15)
], CreateStudentDTO.prototype, "phone_responsable", 2);

exports.CreateStudentDTO = CreateStudentDTO;
//# sourceMappingURL=create-student.dto.js.map
//# sourceMappingURL=create-student.dto.js.map