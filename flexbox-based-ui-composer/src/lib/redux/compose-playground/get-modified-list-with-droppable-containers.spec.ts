jest.mock('uuid', () => {
  let id = 0;
  return {
    v4: () => `mock-uuid-${++id}`,
  };
});

import { getModifiedListWithDroppableContainers } from './get-modified-list-with-droppable-containers';
import { DisplayItemRow, DisplayItemType } from './types.d';

describe('getModifiedListWithDroppableContainers', () => {
  it('falls back to a droppable box when the list is empty', () => {
    const result = getModifiedListWithDroppableContainers([]);

    expect(result).toEqual([
      {
        id: 'mock-uuid-1',
        columns: [
          {
            type: DisplayItemType.DroppableBox,
            id: 'mock-uuid-2',
          },
        ],
      },
    ]);
  });

  it('logs invalid rows and skips them', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    const itemList = [
      { id: 'invalid-row', columns: [] },
      { id: 'also-invalid' },
    ] as DisplayItemRow[];

    const result = getModifiedListWithDroppableContainers(itemList);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid row');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual([
      {
        id: 'row-above-invalid-row',
        columns: [
          { type: DisplayItemType.DroppableBox, id: 'above-invalid-row' },
        ],
      },
    ]);

    consoleErrorSpy.mockRestore();
  });

  it('wraps rows and columns with droppable containers, including multi-column left/right', () => {
    const itemList: DisplayItemRow[] = [
      {
        id: 'row-1',
        columns: [
          { id: 'col-1', type: DisplayItemType.DroppableBox },
          { id: 'col-2', type: DisplayItemType.DroppableBox },
        ],
      },
      {
        id: 'row-2',
        columns: [{ id: 'col-3', type: DisplayItemType.DroppableBox }],
      },
    ];

    const result = getModifiedListWithDroppableContainers(itemList);

    expect(result).toEqual([
      {
        id: 'row-above-row-1',
        columns: [
          { type: DisplayItemType.DroppableBox, id: 'above-row-1' },
        ],
      },
      {
        id: 'row-1',
        columns: [
          {
            type: DisplayItemType.DroppableBox,
            id: 'left-col-1-in-row-1',
          },
          { id: 'col-1', type: DisplayItemType.DroppableBox },
          {
            type: DisplayItemType.DroppableBox,
            id: 'right-col-1-in-row-1',
          },
          { id: 'col-2', type: DisplayItemType.DroppableBox },
          {
            type: DisplayItemType.DroppableBox,
            id: 'right-col-2-in-row-1',
          },
        ],
      },
      {
        id: 'row-below-row-1',
        columns: [
          { type: DisplayItemType.DroppableBox, id: 'below-row-1' },
        ],
      },
      {
        id: 'row-2',
        columns: [
          {
            type: DisplayItemType.DroppableBox,
            id: 'left-col-3-in-row-2',
          },
          { id: 'col-3', type: DisplayItemType.DroppableBox },
          {
            type: DisplayItemType.DroppableBox,
            id: 'right-col-3-in-row-2',
          },
        ],
      },
      {
        id: 'row-below-row-2',
        columns: [
          { type: DisplayItemType.DroppableBox, id: 'below-row-2' },
        ],
      },
    ]);
  });
});
