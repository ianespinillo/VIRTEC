
import type { Request } from "express";
import type { PERMISSIONS} from "@repo/common/permissions";
import type { ROLES } from "@repo/common/roles";


export interface LoginWithDni {
  dni: string;
  password: string;
}

export interface LoginWithEmail {
  email: string;
  password: string;
}

export interface TokenEmailOptions {
  id: number;
  email: string;
}

export interface TokenDniOptions {
  id: number;
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
  school_id: number;
  permissions: string[];
}

export interface AuthRequest extends Request {
  body: {
    user: AuthUser;
  } & Record<string, unknown>;
}

export interface ChangePassword {
  newPassword: string;
}

export interface AuthResponse {
  acces_token: string;
}
