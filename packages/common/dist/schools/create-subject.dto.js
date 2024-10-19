'use strict';

var chunkEUXUH3YW_js = require('../chunk-EUXUH3YW.js');
var classValidator = require('class-validator');

class CreateSubjectDto {
}
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty({
    message: "Name is mandatory for creating a subject"
  })
], CreateSubjectDto.prototype, "name", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty({
    message: "Start time is mandatory for creating a subject"
  })
], CreateSubjectDto.prototype, "start_time", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty({
    message: "End time is mandatory for creating a subject"
  })
], CreateSubjectDto.prototype, "end_time", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsString(),
  classValidator.IsNotEmpty({ message: "Teacher is mandatory for creating a subject" })
], CreateSubjectDto.prototype, "teacher_id", 2);
chunkEUXUH3YW_js.__decorateClass([
  classValidator.IsNotEmpty()
], CreateSubjectDto.prototype, "course_id", 2);

exports.CreateSubjectDto = CreateSubjectDto;
//# sourceMappingURL=create-subject.dto.js.map
//# sourceMappingURL=create-subject.dto.js.map