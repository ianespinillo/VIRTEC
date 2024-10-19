declare const STATUS_CODE: {
    readonly OK: 200;
    readonly NOT_AUTHORIZED: 401;
    readonly NOT_FOUND: 404;
    readonly FORBIDDEN: 403;
    readonly BAD_REQUEST: 400;
    readonly SERVER_ERROR: 500;
};
declare const PASSWORD_LENGTH = 8;
declare const PASSWORD_SALT_ROUNDS = 10;
declare const TOKEN_DURATION = "2h";
declare const TOKEN_NP_DURATION = "10h";
declare const CUIL_LENGTH = 11;

export { CUIL_LENGTH, PASSWORD_LENGTH, PASSWORD_SALT_ROUNDS, STATUS_CODE, TOKEN_DURATION, TOKEN_NP_DURATION };
