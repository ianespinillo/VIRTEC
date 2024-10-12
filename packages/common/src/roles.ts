export const ROLES = {
	SCHOOL_ADMIN: 'SCHOOL_ADMIN',
	TEACHER: 'TEACHER',
	STUDENT: 'STUDENT',
	SUPER_ADMIN: 'SUPER_ADMIN',
	PRECEPTOR: 'PRECEPTOR',
	STOREMAN: 'STOREMAN',
} as const;
export type Roles = (typeof ROLES)[keyof typeof ROLES];