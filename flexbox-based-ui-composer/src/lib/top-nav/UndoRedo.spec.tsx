import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { DisplayItemType } from '../redux/compose-playground/types.d';
import { UndoRedo } from './UndoRedo';

describe('UndoRedo', () => {
  it('disables buttons when history stacks are empty', () => {
    renderWithStore(<UndoRedo />);
    expect(
      (
        screen.getByTestId(
          'sl-icon-button-arrow-counterclockwise'
        ) as HTMLButtonElement
      ).disabled
    ).toBe(true);
    expect(
      (screen.getByTestId('sl-icon-button-arrow-clockwise') as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });

  it('enables and dispatches undo/redo when history exists', () => {
    const row = {
      id: 'row-1',
      columns: [{ id: 'col-1', type: DisplayItemType.DroppableBox }],
    };
    const { store } = renderWithStore(<UndoRedo />, {
      preloadedComposePlayground: {
        itemList: [row],
        displayItemList: [row],
        previousItemListStates: [[]],
        futureItemListStates: [[row]],
      },
    });

    const undoBtn = screen.getByTestId(
      'sl-icon-button-arrow-counterclockwise'
    ) as HTMLButtonElement;
    const redoBtn = screen.getByTestId(
      'sl-icon-button-arrow-clockwise'
    ) as HTMLButtonElement;
    expect(undoBtn.disabled).toBe(false);
    expect(redoBtn.disabled).toBe(false);

    fireEvent.click(undoBtn);
    expect(store.getState().composePlayground.previousItemListStates).toEqual(
      []
    );

    fireEvent.click(redoBtn);
    expect(
      store.getState().composePlayground.previousItemListStates.length
    ).toBeGreaterThan(0);
  });
});
