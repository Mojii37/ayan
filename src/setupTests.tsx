// src/setupTests.ts
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';

// Add custom matchers type definitions
interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
}

declare module 'vitest' {
  interface Assertion extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

// Define the renderWithProviders utility function
export function renderWithProviders(ui: React.ReactElement, options = {}) {
  return {
    ...render(ui, {
      wrapper: ({ children }: PropsWithChildren<{}>) => children,
      ...options,
    }),
  };
}

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

  // Setup vitest as global test environment
  Object.defineProperty(window, 'vi', {
    writable: true,
    value: vi
  });
});

afterAll(() => {
  // Cleanup test environment
  vi.clearAllMocks();
});

// Custom matchers
expect.extend({
  toBeInTheDocument(received: unknown) {
    const pass = Boolean(received);
    if (pass) {
      return {
        message: () => 'expected element to be in the document',
        pass: true,
      };
    } else {
      return {
        message: () => 'expected element to be in the document',
        pass: false,
      };
    }
  },
});

// Re-export for use in tests
export { expect, vi };