"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsNeeded = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const permissions_guard_1 = require("../guards/permissions.guard");
const PermissionsNeeded = (...permissions) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('permissions', permissions), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard));
};
exports.PermissionsNeeded = PermissionsNeeded;
//# sourceMappingURL=permissions.decorator.js.map