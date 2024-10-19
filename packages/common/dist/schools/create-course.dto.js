'use strict';

var chunkEUXUH3YW_js = require('../chunk-EUXUH3YW.js');
var classValidator = require('class-validator');

class CreateCourseDTO {
}
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNotEmpty(),
  classValidator.IsNumber()
], CreateCourseDTO.prototype, "year", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNotEmpty(),
  classValidator.IsNumber()
], CreateCourseDTO.prototype, "division", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNotEmpty(),
  classValidator.IsNumber()
], CreateCourseDTO.prototype, "speciallity_id", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNotEmpty(),
  classValidator.IsNumber()
], CreateCourseDTO.prototype, "preceptor_id", 2);

exports.CreateCourseDTO = CreateCourseDTO;
//# sourceMappingURL=create-course.dto.js.map
//# sourceMappingURL=create-course.dto.js.map