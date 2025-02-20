import '@testing-library/jest-dom';
import { vi, expect, afterEach, beforeEach } from 'vitest';
import type { MockInstance } from 'vitest';

// شبیه‌سازی window.matchMedia
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
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

// گسترش matcher های expect
interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
}

expect.extend({
  toBeInTheDocument(received) {
    const pass = received != null && received !== false;
    return {
      message: () => `expected ${received} to be in the document`,
      pass,
    };
  },
});

// تعریف نوع برای matcher سفارشی
declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}