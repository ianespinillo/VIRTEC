"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreceptorsController = void 0;
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const user_decorator_1 = require("../../auth/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const common_2 = require("@repo/common");
const preceptors_service_1 = require("../services/preceptors.service");
let PreceptorsController = class PreceptorsController {
    constructor(preceptorService) {
        this.preceptorService = preceptorService;
    }
    async create(preceptor) {
        return await this.preceptorService.createPreceptor(preceptor);
    }
    async read(user) {
        return await this.preceptorService.findPreceptorsBySchoolId(user.school_id);
    }
    async delete(id) {
        return await this.preceptorService.deletePreceptor(id);
    }
};
exports.PreceptorsController = PreceptorsController;
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.CREATE_PRECEPTORS),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], PreceptorsController.prototype, "create", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.READ_PRECEPTORS),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreceptorsController.prototype, "read", null);
__decorate([
    (0, permissions_decorator_1.PermissionsNeeded)(common_2.PERMISSIONS.DELETE_PRECEPTORS),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PreceptorsController.prototype, "delete", null);
exports.PreceptorsController = PreceptorsController = __decorate([
    (0, common_1.Controller)('preceptors'),
    __metadata("design:paramtypes", [preceptors_service_1.PreceptorsService])
], PreceptorsController);
//# sourceMappingURL=preceptors.controller.js.map