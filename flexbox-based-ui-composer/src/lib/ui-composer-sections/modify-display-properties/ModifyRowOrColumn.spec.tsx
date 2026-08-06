import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../../test-utils/render-with-store';
import { DisplayItemType } from '../../redux/compose-playground/types.d';
import { ModifyRowOrColumn } from './ModifyRowOrColumn';

describe('ModifyRowOrColumn', () => {
  const selectedDisplayItem = {
    id: 'col-1',
    containerId: 'row-1',
    componentType: 'wired-button' as DisplayItemType,
  };

  const baseRows = [
    {
      id: 'row-1',
      columns: [
        { id: 'col-1', type: 'wired-button' as DisplayItemType },
        { id: 'col-2', type: DisplayItemType.DroppableBox },
      ],
    },
  ];

  it('dispatches all row and widget actions', () => {
    const onClose = jest.fn();
    const onSetModifyRowLayout = jest.fn();
    const { store } = renderWithStore(
      <ModifyRowOrColumn
        onClose={onClose}
        selectedDisplayItem={selectedDisplayItem}
        onSetModifyRowLayout={onSetModifyRowLayout}
      />,
      {
        preloadedComposePlayground: {
          itemList: baseRows,
          displayItemList: baseRows,
          selectedDisplayItem,
          previousItemListStates: [],
          futureItemListStates: [],
        },
      }
    );

    fireEvent.click(screen.getByText('Change Row Layout'));
    expect(onSetModifyRowLayout).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Duplicate Row'));
    expect(store.getState().composePlayground.itemList.length).toBeGreaterThan(
      1
    );

    fireEvent.click(screen.getByText('Duplicate Widget'));
    expect(
      store
        .getState()
        .composePlayground.itemList.some((row) =>
          row.columns.some((col) => col.type === ('wired-button' as DisplayItemType))
        )
    ).toBe(true);

    fireEvent.click(screen.getByText('Delete Widget'));
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('dispatches delete selected row', () => {
    const onClose = jest.fn();
    const { store } = renderWithStore(
      <ModifyRowOrColumn
        onClose={onClose}
        selectedDisplayItem={selectedDisplayItem}
        onSetModifyRowLayout={jest.fn()}
      />,
      {
        preloadedComposePlayground: {
          itemList: baseRows,
          displayItemList: baseRows,
          selectedDisplayItem,
        },
      }
    );

    fireEvent.click(screen.getByText('Delete Row'));
    expect(
      store.getState().composePlayground.itemList.find((r) => r.id === 'row-1')
    ).toBeUndefined();
  });
});
