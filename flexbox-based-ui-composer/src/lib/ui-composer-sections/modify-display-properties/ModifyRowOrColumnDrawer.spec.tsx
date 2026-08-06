import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../../test-utils/render-with-store';
import { DisplayItemType } from '../../redux/compose-playground/types.d';
import { ModifyRowOrColumnDrawer } from './ModifyRowOrColumnDrawer';

describe('ModifyRowOrColumnDrawer', () => {
  it('returns null when nothing is selected', () => {
    const { container } = renderWithStore(<ModifyRowOrColumnDrawer />);
    expect(container.firstChild).toBeNull();
  });

  it('shows ModifyRowOrColumn when modifyingRowLayout is false', () => {
    renderWithStore(<ModifyRowOrColumnDrawer />, {
      preloadedComposePlayground: {
        selectedDisplayItem: {
          id: 'col-1',
          containerId: 'row-1',
          componentType: 'wired-button' as DisplayItemType,
          modifyingRowLayout: false,
        },
      },
    });
    expect(screen.getByTestId('sl-drawer')).toBeTruthy();
    expect(screen.getByText('Change Row Layout')).toBeTruthy();
    expect(screen.queryByText('Row Layout')).toBeNull();
  });

  it('shows ModifyRowLayout when modifyingRowLayout is true', () => {
    renderWithStore(<ModifyRowOrColumnDrawer />, {
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
            columns: [
              { id: 'col-1', type: 'wired-button' as DisplayItemType },
            ],
          },
        ],
      },
    });
    expect(screen.getByText('Row Layout')).toBeTruthy();
    expect(screen.getByText('Horizontal Alignment')).toBeTruthy();
  });

  it('clears selection on hide and sets modifying row layout', () => {
    const { store } = renderWithStore(<ModifyRowOrColumnDrawer />, {
      preloadedComposePlayground: {
        selectedDisplayItem: {
          id: 'col-1',
          containerId: 'row-1',
          componentType: 'wired-button' as DisplayItemType,
        },
      },
    });

    fireEvent.click(screen.getByText('Change Row Layout'));
    expect(
      store.getState().composePlayground.selectedDisplayItem?.modifyingRowLayout
    ).toBe(true);

    // re-open drawer path after layout mode — hide clears selection
    fireEvent.click(screen.getByTestId('sl-drawer-hide'));
    expect(store.getState().composePlayground.selectedDisplayItem).toBeUndefined();
  });
});
