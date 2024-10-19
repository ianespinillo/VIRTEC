export interface User {
	email: string;
	password: string;
	school_id: number;
}

export interface UserDetail extends User {
	address: string;
	dni: string;
	birthdate: string;
	cuil: string;
	name: string;
	surname: string;
}

export interface AuthUser {
	id: string;
	dni: string;
	email?: string;
	name: string;
	school_id: number;
}

declare module 'express' {
	interface Request {
		body: {
			user?: AuthUser;
		} & Record<string, unknown>;
	}
}
