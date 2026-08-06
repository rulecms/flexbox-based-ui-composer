import { fireEvent, render, screen } from '@testing-library/react';
import App from './app';

describe('App', () => {
  beforeEach(() => {
    document.documentElement.className = '';
  });

  it('should render successfully with RuleCMS Wireframe title', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('RuleCMS Wireframe')).toBeTruthy();
    expect(screen.getByTestId('flexbox-based-ui-composer-mock')).toBeTruthy();
  });

  it('should switch to light theme', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('sl-radio-button-light'));
    expect(document.documentElement.classList.contains('sl-theme-light')).toBe(
      true
    );
    expect(document.documentElement.classList.contains('sl-theme-dark')).toBe(
      false
    );
  });

  it('should switch to dark theme', () => {
    document.documentElement.classList.add('sl-theme-light');
    render(<App />);
    fireEvent.click(screen.getByTestId('sl-radio-button-dark'));
    expect(document.documentElement.classList.contains('sl-theme-dark')).toBe(
      true
    );
    expect(document.documentElement.classList.contains('sl-theme-light')).toBe(
      false
    );
  });
});
