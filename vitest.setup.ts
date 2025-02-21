import { afterEach, beforeEach, vi, expect } from 'vitest';
import { cleanup } from '@testing-library/react';

// پاکسازی بعد از هر تست
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// تنظیم matchMedia
beforeEach(() => {
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
});

// تعریف matcher های سفارشی
interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
}

expect.extend({
  toBeInTheDocument(received) {
    const pass = received != null && received !== false;
    return {
      message: () => `expected ${received} ${pass ? 'not ' : ''}to be in the document`,
      pass,
    };
  },
});

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}