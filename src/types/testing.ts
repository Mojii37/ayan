// src/types/testing.ts
export type TestStatus = 'passed' | 'failed' | 'pending' | 'skipped';
export type TestType = 'unit' | 'integration' | 'e2e' | 'performance';

export interface TestCase {
  id: string;
  name: string;
  type: TestType;
  status: TestStatus;
  duration: number;
  error?: string;
  stackTrace?: string;
  assertions: number;
  failedAssertions: number;
  coverage?: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
}

export interface TestSuite {
  id: string;
  name: string;
  description?: string;
  testCases: TestCase[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  duration: number;
  startTime: Date;
  endTime?: Date;
}
