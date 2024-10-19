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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor(configService) {
        this.api_key = configService.get('CLOUDINARY_API_KEY');
        this.api_secret = configService.get('CLOUDINARY_API_SECRET');
        this.cloud_name = configService.get('CLOUDINARY_CLOUD_NAME');
        cloudinary_1.v2.config({
            cloud_name: this.cloud_name,
            api_key: this.api_key,
            api_secret: this.api_secret,
        });
    }
    async uploadFile(file) {
        try {
            const tempDir = (0, node_path_1.join)((0, node_process_1.cwd)(), '/temp');
            await (0, promises_1.mkdir)(tempDir, { recursive: true });
            const filePath = (0, node_path_1.join)(tempDir, file.originalname);
            await (0, promises_1.writeFile)(filePath, new Uint8Array(file.buffer));
            const response = await cloudinary_1.v2.uploader.upload(filePath, {
                public_id: file.originalname,
                folder: 'schools-crest/',
            });
            return response.secure_url;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error uploading file');
        }
    }
    async deleteFile(url) {
        const id = url.split('/').slice(-1)[0].split('.')[0];
        const folder = 'schools-crest/';
        const response = await cloudinary_1.v2.uploader.destroy(folder + id);
        return Boolean(response);
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map