import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../test-utils';
import { screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { store } = renderWithProviders(<App />);
    expect(store.getState()).toBeDefined();
  });

  it('renders with correct layout structure', () => {
    renderWithProviders(<App />);
    
    const header = screen.getByTestId('app-header');
    const main = screen.getByTestId('app-main');
    const footer = screen.getByTestId('app-footer');

    expect(header).toBeDefined();
    expect(main).toBeDefined();
    expect(footer).toBeDefined();
  });
});