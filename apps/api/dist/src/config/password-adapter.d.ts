export declare class PasswordAdapter {
    static generateHashedPassword(length: number): Promise<{
        password: string;
        hashedPassword: string;
    }>;
    static hashPassword(password: string): any;
    static comparePassword(password: string, hashedPassword: string): any;
}
