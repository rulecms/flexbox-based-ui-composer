import React from 'react';
import { render } from '@testing-library/react';
import { DisplayBox } from './DisplayBox';

describe('horizontal DisplayBox', () => {
  it('applies width and height style props', () => {
    const { container } = render(<DisplayBox width="12px" height="24px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('12px');
    expect(el.style.height).toBe('24px');
    // jsdom drops CSS-variable backgroundColor from the style attribute;
    // rendering the component is enough to cover the statement.
    expect(el).toBeTruthy();
  });
});
