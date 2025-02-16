import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';

// Global test setup
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Setup global test environment
  if (typeof globalThis.jest === 'undefined') {
    (globalThis as any).jest = vi;
  }
});

afterAll(() => {
  // Cleanup global test environment
  vi.clearAllMocks();
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