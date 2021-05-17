
// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {

    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ["<rootDir>/src/setup.js"],

    verbose: true,
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js"
    ],
    transform: {
        "^.+\\.(ts|ts)$": "ts-jest"
    },
    testMatch: [
        "**/__tests__/*.(spec|test).+(ts|tsx|js)"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ]
};
export default config;

