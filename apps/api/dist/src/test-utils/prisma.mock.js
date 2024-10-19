"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getprismaMockService = void 0;
const prisma_service_1 = require("../db/prisma.service");
const mock_db_1 = require("../testing/mock-db");
const getprismaMockService = () => ({
    provide: prisma_service_1.PrismaService,
    useValue: mock_db_1.prismaMock,
});
exports.getprismaMockService = getprismaMockService;
//# sourceMappingURL=prisma.mock.js.map