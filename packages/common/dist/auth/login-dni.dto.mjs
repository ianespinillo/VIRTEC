import { __decorateClass } from '../chunk-SAWN7RJP.mjs';
import { MinLength, Length } from 'class-validator';

class LoginDniDTO {
}
__decorateClass([
  MinLength(8),
  Length(8, 8, {
    message: "El DNI debe tener 8 caracteres"
  })
], LoginDniDTO.prototype, "dni", 2);
__decorateClass([
  MinLength(8, {
    message: "La contrase\xF1a debe tener 8 caracteres como minimo"
  })
], LoginDniDTO.prototype, "password", 2);

export { LoginDniDTO };
//# sourceMappingURL=login-dni.dto.mjs.map
//# sourceMappingURL=login-dni.dto.mjs.map