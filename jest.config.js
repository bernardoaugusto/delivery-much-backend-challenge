module.exports = {
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: ['<rootDir>/src/services/*.ts'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['text-summary', 'lcov'],
    preset: 'ts-jest',
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
};
