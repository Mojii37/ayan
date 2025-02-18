import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import type { MockInstance } from 'vitest';

// Precise type definitions for Jest-like mocking
interface JestMock {
  fn: <T extends (...args: any[]) => any>(implementation?: T) => MockInstance<Parameters<T>, ReturnType<T>>;
  spyOn: typeof vi.spyOn;
  mock: (moduleName: string) => any;
  test: typeof vi.test;
}

// Extend global namespace
declare global {
  var jest: JestMock;
}

// Window.matchMedia mock with proper typing
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

// Global Jest-like utilities with correct typing
globalThis.jest = {
  fn: vi.fn,
  spyOn: vi.spyOn,
  mock: (moduleName: string) => vi.mock(moduleName),
  test: vi.test
};

// Extended expect matcher
expect.extend({
  toBeInTheDocument(received) {
    const pass = received != null && received !== false;
    return {
      message: () => `expected ${received} to be in the document`,
      pass,
    };
  },
});