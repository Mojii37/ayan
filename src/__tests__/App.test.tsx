import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderWithProviders } from '../setupTests';
import App from '../App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  const testDate = new Date('2025-02-15T10:03:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(testDate);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<App />, { route: '/' });
    expect(container).toBeInTheDocument();
  });

  it('renders with correct layout structure', () => {
    const { getByTestId } = renderWithProviders(<App />, { route: '/' });
    
    expect(getByTestId('app-header')).toBeInTheDocument();
    expect(getByTestId('app-main')).toBeInTheDocument();
    expect(getByTestId('app-footer')).toBeInTheDocument();
  });
});