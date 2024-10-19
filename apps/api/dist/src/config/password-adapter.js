"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordAdapter = void 0;
const common_1 = require("@repo/common");
const bcryptjs_1 = require("bcryptjs");
class PasswordAdapter {
    static async generateHashedPassword(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        const hashPassword = await (0, bcryptjs_1.hash)(password, 10);
        return { password, hashedPassword: hashPassword };
    }
    static hashPassword(password) {
        return (0, bcryptjs_1.hash)(password, common_1.PASSWORD_SALT_ROUNDS);
    }
    static comparePassword(password, hashedPassword) {
        return (0, bcryptjs_1.compare)(password, hashedPassword);
    }
}
exports.PasswordAdapter = PasswordAdapter;
//# sourceMappingURL=password-adapter.js.map