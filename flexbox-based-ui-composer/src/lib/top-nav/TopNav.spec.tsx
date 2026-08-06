import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { TopNav } from './TopNav';

describe('TopNav', () => {
  it('renders device selector and undo/redo controls', () => {
    renderWithStore(<TopNav />);
    expect(screen.getByTestId('sl-radio-group')).toBeTruthy();
    expect(
      screen.getByTestId('sl-icon-button-arrow-counterclockwise')
    ).toBeTruthy();
    expect(screen.getByTestId('sl-icon-button-arrow-clockwise')).toBeTruthy();
  });
});
