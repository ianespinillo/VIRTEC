import { __decorateClass } from '../chunk-SAWN7RJP.mjs';
import { IsString, IsEmail, IsNumber, MinLength, MaxLength } from 'class-validator';
import { IsValidCuil } from '../pipes/validate-cuil/validate-cuil.pipe';

class CreateUserDTO {
}
__decorateClass([
  IsString(),
  IsEmail()
], CreateUserDTO.prototype, "email", 2);
__decorateClass([
  IsNumber()
], CreateUserDTO.prototype, "school_id", 2);
__decorateClass([
  IsString()
], CreateUserDTO.prototype, "name", 2);
__decorateClass([
  IsString()
], CreateUserDTO.prototype, "surname", 2);
__decorateClass([
  IsString(),
  MinLength(1),
  MaxLength(8)
], CreateUserDTO.prototype, "dni", 2);
__decorateClass([
  IsString()
], CreateUserDTO.prototype, "address", 2);
__decorateClass([
  IsString()
], CreateUserDTO.prototype, "birthdate", 2);
__decorateClass([
  IsString(),
  IsValidCuil("cuil", {
    message: "Please enter a valid CUIL"
  })
], CreateUserDTO.prototype, "cuil", 2);
__decorateClass([
  IsNumber()
], CreateUserDTO.prototype, "role_id", 2);

export { CreateUserDTO };
//# sourceMappingURL=user.dto.mjs.map
//# sourceMappingURL=user.dto.mjs.map