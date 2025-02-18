import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  
  // Enhanced setup and configuration
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Improved module mapping
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  // Enhanced transform configuration
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
        diagnostics: {
          warnOnly: true,
        },
      },
    ],
  },
  
  // Comprehensive test matching
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  
  // Additional configurations
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/setupTests.ts',
  ],
  
  // Performance and speed optimizations
  maxWorkers: '50%',
  
  // Ignore specific paths
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
};

export default config;