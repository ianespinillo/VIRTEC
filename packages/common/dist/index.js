'use strict';

require('./chunk-EUXUH3YW.js');
var constants = require('./constants');
var user_dto = require('./users/user.dto');
var createCourse_dto = require('./schools/create-course.dto');
var createTeacher_dto = require('./schools/create-teacher.dto');
var createStudent_dto = require('./schools/create-student.dto');
var createSchool_dto = require('./schools/create-school.dto');
var createSubject_dto = require('./schools/create-subject.dto');
var validateCuil_pipe = require('./pipes/validate-cuil/validate-cuil.pipe');
var createSpeciallity_dto = require('./schools/create-speciallity.dto');
var loginDni_dto = require('./auth/login-dni.dto');
var loginPassword_dto = require('./auth/login-password.dto');
var types = require('./auth/types');
var permissions = require('./permissions');
var roles = require('./roles');



Object.defineProperty(exports, "PERMISSIONS", {
  enumerable: true,
  get: function () { return permissions.PERMISSIONS; }
});
Object.defineProperty(exports, "ROLES", {
  enumerable: true,
  get: function () { return roles.ROLES; }
});
Object.keys(constants).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return constants[k]; }
  });
});
Object.keys(user_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return user_dto[k]; }
  });
});
Object.keys(createCourse_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return createCourse_dto[k]; }
  });
});
Object.keys(createTeacher_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return createTeacher_dto[k]; }
  });
});
Object.keys(createStudent_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return createStudent_dto[k]; }
  });
});
Object.keys(createSchool_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return createSchool_dto[k]; }
  });
});
Object.keys(createSubject_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return createSubject_dto[k]; }
  });
});
Object.keys(validateCuil_pipe).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return validateCuil_pipe[k]; }
  });
});
Object.keys(createSpeciallity_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return createSpeciallity_dto[k]; }
  });
});
Object.keys(loginDni_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return loginDni_dto[k]; }
  });
});
Object.keys(loginPassword_dto).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return loginPassword_dto[k]; }
  });
});
Object.keys(types).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return types[k]; }
  });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map