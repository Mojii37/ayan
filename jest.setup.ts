import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global test setup
beforeAll(() => {
  // Setup global test environment
});

afterAll(() => {
  // Cleanup global test environment
});

// Custom matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = Boolean(received);
    return {
      message: () =>
        `expected ${received} ${pass ? 'not ' : ''}to be in the document`,
      pass,
    };
  },
});