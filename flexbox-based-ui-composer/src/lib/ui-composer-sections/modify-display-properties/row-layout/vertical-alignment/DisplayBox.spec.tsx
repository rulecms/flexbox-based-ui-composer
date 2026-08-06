import React from 'react';
import { render } from '@testing-library/react';
import { DisplayBox } from './DisplayBox';

describe('vertical DisplayBox', () => {
  it('applies width and minHeight style props', () => {
    const { container } = render(<DisplayBox width="12px" height="24px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('12px');
    expect(el.style.minHeight).toBe('24px');
    expect(el).toBeTruthy();
  });
});
