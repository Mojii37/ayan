import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentInfo from '../CurrentInfo';
import * as getCurrentInfoModule from '../../../utils/getCurrentInfo';

describe('CurrentInfo', () => {
  const username = 'Mojim47';

  it('renders with correct date and username', () => {
    const mockGetCurrentInfo = vi.spyOn(getCurrentInfoModule, 'getCurrentInfo').mockReturnValue(
      'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-15 06:28:04\nCurrent User\'s Login: Mojim47'
    );

    render(<CurrentInfo username={username} />);

    const expectedDateText = 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-02-15 06:28:04';
    expect(screen.getByText(expectedDateText)).toBeInTheDocument();

    const expectedUserText = `Current User's Login: ${username}`;
    expect(screen.getByText(expectedUserText)).toBeInTheDocument();

    mockGetCurrentInfo.mockRestore();
  });
});