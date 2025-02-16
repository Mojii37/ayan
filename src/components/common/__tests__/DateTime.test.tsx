import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentDateTime from '../CurrentDateTime';

describe('CurrentDateTime', () => {
  const username = 'Mojim47';
  const testDate = '2025-02-13T17:56:59.000Z';

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(testDate));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with correct initial date and username', () => {
    render(
      <CurrentDateTime 
        username={username} 
        initialDate={testDate} 
      />
    );

    const expectedDateText = 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-13 17:56:59';
    const expectedUserText = `Current User's Login: ${username}`;

    expect(screen.getByText(expectedDateText)).toBeInTheDocument();
    expect(screen.getByText(expectedUserText)).toBeInTheDocument();
  });

  it('maintains fixed date with timer', () => {
    render(
      <CurrentDateTime 
        username={username} 
        initialDate={testDate}
      />
    );

    const expectedDateText = 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-13 17:56:59';

    // Check initial render
    expect(screen.getByText(expectedDateText)).toBeInTheDocument();

    // Advance timer by 1 second
    vi.advanceTimersByTime(1000);

    // Should still show the same time
    expect(screen.getByText(expectedDateText)).toBeInTheDocument();
  });
});