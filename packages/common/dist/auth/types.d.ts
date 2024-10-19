import { PERMISSIONS } from '../permissions.js';
import { ROLES } from '../roles.js';

interface LoginWithDni {
    dni: string;
    password: string;
}
interface LoginWithEmail {
    email: string;
    password: string;
}
interface TokenEmailOptions {
    sub: string;
    email: string;
}
interface TokenDniOptions {
    sub: string;
    dni: string;
}
type TokenOptions = TokenDniOptions | TokenEmailOptions;
type Permissions = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
type Roles = (typeof ROLES)[keyof typeof ROLES];
interface AuthUser {
    id: string;
    dni: string;
    email?: string;
    name: string;
    role_id: number;
    school_id: number;
    permissions: string[];
}
interface ChangePassword {
    newPassword: string;
}
interface AuthResponse {
    acces_token: string;
    message?: string;
    statusCode?: number;
}

export type { AuthResponse, AuthUser, ChangePassword, LoginWithDni, LoginWithEmail, Permissions, Roles, TokenDniOptions, TokenEmailOptions, TokenOptions };
