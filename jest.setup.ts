import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import '@testing-library/jest-dom';

describe('Global Test Suite', () => {
  beforeAll(() => {
    // Setup global test environment
  });

  afterAll(() => {
    // Cleanup global test environment
  });

  // If you want to use custom matchers
  expect.extend({
    toBeInTheDocument(received) {
      const pass = received != null && received !== false;
      return {
        message: () =>
          `expected ${received} ${pass ? 'not ' : ''}to be in the document`,
        pass,
      };
    },
  });

  // Example test
  it('should have custom matcher', () => {
    // Your test logic here
  });
});