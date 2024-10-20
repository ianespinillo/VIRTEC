"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: [
        'main.ts',
        '.dto.ts',
        '.module.ts',
        '.mock.ts',
        'common-imports',
        'db-testing.utils.ts',
        'roles',
        'decorators',
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map