import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { SelectionPanel } from './SelectionPanel';

describe('SelectionPanel', () => {
  it('renders title and children', () => {
    render(
      <SelectionPanel title="Panel Title">
        <span>panel child</span>
      </SelectionPanel>
    );
    expect(screen.getByText('Panel Title')).toBeTruthy();
    expect(screen.getByText('panel child')).toBeTruthy();
  });
});
