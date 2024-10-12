export const STATUS_CODE = {
	OK: 200,
	NOT_AUTHORIZED: 401,
	NOT_FOUND: 404,
	FORBIDDEN: 403,
	BAD_REQUEST: 400,
	SERVER_ERROR: 500,
} as const;

export const PASSWORD_LENGTH = 8;
export const PASSWORD_SALT_ROUNDS = 10;
export const TOKEN_DURATION = '2h';
// Duration in hours for change password
export const TOKEN_NP_DURATION = '10h';
export const CUIL_LENGTH = 11;
