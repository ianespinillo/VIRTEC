declare const ROLES: {
    readonly SCHOOL_ADMIN: "SCHOOL_ADMIN";
    readonly TEACHER: "TEACHER";
    readonly STUDENT: "STUDENT";
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly PRECEPTOR: "PRECEPTOR";
    readonly STOREMAN: "STOREMAN";
};
type Roles = (typeof ROLES)[keyof typeof ROLES];

export { ROLES, type Roles };
