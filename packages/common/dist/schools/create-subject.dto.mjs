import { __decorateClass } from '../chunk-SAWN7RJP.mjs';
import { IsString, IsNotEmpty } from 'class-validator';

class CreateSubjectDto {
}
__decorateClass([
  IsString(),
  IsNotEmpty({
    message: "Name is mandatory for creating a subject"
  })
], CreateSubjectDto.prototype, "name", 2);
__decorateClass([
  IsString(),
  IsNotEmpty({
    message: "Start time is mandatory for creating a subject"
  })
], CreateSubjectDto.prototype, "start_time", 2);
__decorateClass([
  IsString(),
  IsNotEmpty({
    message: "End time is mandatory for creating a subject"
  })
], CreateSubjectDto.prototype, "end_time", 2);
__decorateClass([
  IsString(),
  IsNotEmpty({ message: "Teacher is mandatory for creating a subject" })
], CreateSubjectDto.prototype, "teacher_id", 2);
__decorateClass([
  IsNotEmpty()
], CreateSubjectDto.prototype, "course_id", 2);

export { CreateSubjectDto };
//# sourceMappingURL=create-subject.dto.mjs.map
//# sourceMappingURL=create-subject.dto.mjs.map