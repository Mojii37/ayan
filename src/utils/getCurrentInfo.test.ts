import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCurrentInfo } from './getCurrentInfo';

describe('getCurrentInfo', () => {
  beforeEach(() => {
    // تنظیم تاریخ مصنوعی برای تست
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-02-15T10:22:40Z'));
  });

  afterEach(() => {
    // برگرداندن تاریخ سیستم به حالت عادی
    vi.useRealTimers();
  });

  it('returns exact expected format', () => {
    const result = getCurrentInfo('Mojim47');
    const expected = 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-15 10:22:40\nCurrent User\'s Login: Mojim47\n';
    expect(result).toBe(expected);
  });

  it('handles different usernames', () => {
    const result = getCurrentInfo('different_user');
    const expected = 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-15 10:22:40\nCurrent User\'s Login: different_user\n';
    expect(result).toBe(expected);
  });

  it('matches the expected format pattern', () => {
    const result = getCurrentInfo('Mojim47');
    expect(result).toMatch(/Current Date and Time \(UTC - YYYY-MM-DD HH:MM:SS formatted\): \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\nCurrent User's Login: Mojim47\n/);
  });
});