export declare class JwtAdapter {
    static generateToken(payload: Record<string, unknown>, duration?: string): Promise<unknown>;
    static validateToken<T>(token: string): Promise<T | null>;
}
