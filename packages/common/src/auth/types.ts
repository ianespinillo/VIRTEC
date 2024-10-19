import type { PERMISSIONS } from '../permissions';
import type { ROLES } from '../roles';

export interface LoginWithDni {
	dni: string;
	password: string;
}

export interface LoginWithEmail {
	email: string;
	password: string;
}

export interface TokenEmailOptions {
	sub: string;
	email: string;
}

export interface TokenDniOptions {
	sub: string;
	dni: string;
}

export type TokenOptions = TokenDniOptions | TokenEmailOptions;

export type Permissions = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
export type Roles = (typeof ROLES)[keyof typeof ROLES];

export interface AuthUser {
	id: string;
	dni: string;
	email?: string;
	name: string;
	role_id: number;
	school_id: number;
	permissions: string[];
}

export interface ChangePassword {
	newPassword: string;
}

export interface AuthResponse {
	acces_token: string;
	message?: string;
	statusCode?: number;
}
