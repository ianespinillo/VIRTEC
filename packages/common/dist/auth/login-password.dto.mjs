import { __decorateClass } from '../chunk-SAWN7RJP.mjs';
import { MinLength, IsEmail } from 'class-validator';

class LoginEmailDTO {
}
__decorateClass([
  MinLength(8, {
    message: "La contrase\xF1a debe tener 8 caracteres como minimo"
  })
], LoginEmailDTO.prototype, "password", 2);
__decorateClass([
  MinLength(1),
  IsEmail({}, { message: "Email con formato incorrecto" })
], LoginEmailDTO.prototype, "email", 2);

export { LoginEmailDTO };
//# sourceMappingURL=login-password.dto.mjs.map
//# sourceMappingURL=login-password.dto.mjs.map