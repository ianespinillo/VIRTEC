"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const common_1 = require("@repo/common/");
const jsonwebtoken_1 = require("jsonwebtoken");
const envs_1 = require("./envs");
const JWT_SECRET = envs_1.envs.JWT_SECRET;
class JwtAdapter {
    static async generateToken(payload, duration = common_1.TOKEN_DURATION) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err)
                    return resolve(null);
                resolve(token);
            });
        });
    }
    static validateToken(token) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
                if (err)
                    return resolve(null);
                resolve(decoded);
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
//# sourceMappingURL=jwt-adapter.js.map