import { __decorateClass } from '../chunk-SAWN7RJP.mjs';
import { CreateUserDTO } from '../users/user.dto';
import { IsNumber, IsString, IsNotEmpty, IsBoolean, IsOptional, Length } from 'class-validator';

class CreateStudentDTO extends CreateUserDTO {
}
__decorateClass([
  IsNumber()
], CreateStudentDTO.prototype, "id_course", 2);
__decorateClass([
  IsNumber()
], CreateStudentDTO.prototype, "id_school_period", 2);
__decorateClass([
  IsString(),
  IsNotEmpty()
], CreateStudentDTO.prototype, "n_legajo", 2);
__decorateClass([
  IsString(),
  IsNotEmpty()
], CreateStudentDTO.prototype, "origin_school", 2);
__decorateClass([
  IsNumber()
], CreateStudentDTO.prototype, "id_next_course", 2);
__decorateClass([
  IsBoolean()
], CreateStudentDTO.prototype, "partial_debt", 2);
__decorateClass([
  IsBoolean()
], CreateStudentDTO.prototype, "equivalences", 2);
__decorateClass([
  IsBoolean()
], CreateStudentDTO.prototype, "differenced_circuit", 2);
__decorateClass([
  IsString(),
  IsOptional()
], CreateStudentDTO.prototype, "previa_1_id", 2);
__decorateClass([
  IsString(),
  IsOptional()
], CreateStudentDTO.prototype, "previa_2_id", 2);
__decorateClass([
  IsString(),
  IsNotEmpty()
], CreateStudentDTO.prototype, "name_responsable", 2);
__decorateClass([
  IsString(),
  IsNotEmpty()
], CreateStudentDTO.prototype, "surname_responsable", 2);
__decorateClass([
  IsString()
], CreateStudentDTO.prototype, "cuil_responsable", 2);
__decorateClass([
  IsString(),
  Length(10, 15)
], CreateStudentDTO.prototype, "phone_responsable", 2);

export { CreateStudentDTO };
//# sourceMappingURL=create-student.dto.mjs.map
//# sourceMappingURL=create-student.dto.mjs.map