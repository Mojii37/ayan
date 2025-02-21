import { describe, it, expect, beforeEach } from 'vitest';
import { renderWithProviders } from '../test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    // تنظیمات اولیه قبل از هر تست
  });

  it('renders without crashing', () => {
    const { store } = renderWithProviders(<App />, {
      preloadedState: {
        auth: {
          isAuthenticated: false,
          user: null
        },
        settings: {
          theme: {
            mode: 'light'
          }
        }
      }
    });

    expect(screen.getByTestId('app-header')).toBeInTheDocument();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });
});