import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../../../test-utils/render-with-store';
import { DisplayItemType } from '../../../redux/compose-playground/types.d';
import { ModifyRowLayout } from './ModifyRowLayout';

describe('ModifyRowLayout', () => {
  it('renders horizontal and vertical alignment sections', () => {
    renderWithStore(<ModifyRowLayout />, {
      preloadedComposePlayground: {
        selectedDisplayItem: {
          id: 'col-1',
          containerId: 'row-1',
          componentType: 'wired-button' as DisplayItemType,
          modifyingRowLayout: true,
        },
        itemList: [
          {
            id: 'row-1',
            columns: [{ id: 'col-1', type: 'wired-button' as DisplayItemType }],
          },
        ],
      },
    });
    expect(screen.getByText('Row Layout')).toBeTruthy();
    expect(screen.getByText('Horizontal Alignment')).toBeTruthy();
    expect(screen.getByText('Vertical Alignment')).toBeTruthy();
  });
});
