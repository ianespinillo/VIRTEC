"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./db/prisma.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    app.use(cookieParser());
    await app.listen(3001);
    const isSeedMode = Boolean(process.env.SEED_MODE);
    if (isSeedMode) {
        await app.get(prisma_service_1.PrismaService).seed();
    }
}
bootstrap();
//# sourceMappingURL=main.js.map