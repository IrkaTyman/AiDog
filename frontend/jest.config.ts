import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testMatch: [
        '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
    ],
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
        '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1',
        '^@entities/(.*)$': '<rootDir>/src/entities/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',

        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.ts',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
        '\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
    },
    transform: {
        '^.+\\.(j|t)sx?$': ['ts-jest', {isolatedModules: true}],
    },
    setupFilesAfterEnv: ['<rootDir>/src/setup-test.ts']
};

export default config;
