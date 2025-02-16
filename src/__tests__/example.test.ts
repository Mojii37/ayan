import { vi, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

beforeAll(() => {
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

describe('Example Test', () => {
  it('should work with custom matcher', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    expect(element).toBeInTheDocument();
  });

  it('should work with mocked matchMedia', () => {
    expect(window.matchMedia).toBeDefined();
    const mql = window.matchMedia('(min-width: 768px)');
    expect(mql.matches).toBe(false);
  });
});