'use strict';

require('./chunk-EUXUH3YW.js');

const STATUS_CODE = {
  OK: 200,
  NOT_AUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500
};
const PASSWORD_LENGTH = 8;
const PASSWORD_SALT_ROUNDS = 10;
const TOKEN_DURATION = "2h";
const TOKEN_NP_DURATION = "10h";
const CUIL_LENGTH = 11;

exports.CUIL_LENGTH = CUIL_LENGTH;
exports.PASSWORD_LENGTH = PASSWORD_LENGTH;
exports.PASSWORD_SALT_ROUNDS = PASSWORD_SALT_ROUNDS;
exports.STATUS_CODE = STATUS_CODE;
exports.TOKEN_DURATION = TOKEN_DURATION;
exports.TOKEN_NP_DURATION = TOKEN_NP_DURATION;
//# sourceMappingURL=constants.js.map
//# sourceMappingURL=constants.js.map