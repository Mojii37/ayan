import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import { renderWithProviders } from '../../../setupTests';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  it('should render login form', async () => {
    await act(async () => {
      renderWithProviders(<LoginForm onSubmit={vi.fn()} />);
    });
    
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByLabelText('نام کاربری')).toBeInTheDocument();
    expect(screen.getByLabelText('رمز عبور')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ورود' })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    await act(async () => {
      renderWithProviders(<LoginForm onSubmit={handleSubmit} />);
    });

    const usernameInput = screen.getByLabelText('نام کاربری');
    const passwordInput = screen.getByLabelText('رمز عبور');
    const submitButton = screen.getByRole('button', { name: 'ورود' });

    await act(async () => {
      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);
    });

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith('testuser', 'password123');
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});