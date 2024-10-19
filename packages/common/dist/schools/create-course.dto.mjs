import { __decorateClass } from '../chunk-SAWN7RJP.mjs';
import { IsNotEmpty, IsNumber } from 'class-validator';

class CreateCourseDTO {
}
__decorateClass([
  IsNotEmpty(),
  IsNumber()
], CreateCourseDTO.prototype, "year", 2);
__decorateClass([
  IsNotEmpty(),
  IsNumber()
], CreateCourseDTO.prototype, "division", 2);
__decorateClass([
  IsNotEmpty(),
  IsNumber()
], CreateCourseDTO.prototype, "speciallity_id", 2);
__decorateClass([
  IsNotEmpty(),
  IsNumber()
], CreateCourseDTO.prototype, "preceptor_id", 2);

export { CreateCourseDTO };
//# sourceMappingURL=create-course.dto.mjs.map
//# sourceMappingURL=create-course.dto.mjs.map