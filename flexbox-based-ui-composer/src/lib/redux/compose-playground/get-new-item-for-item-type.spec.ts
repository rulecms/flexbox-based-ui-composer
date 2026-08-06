jest.mock('uuid', () => {
  let id = 0;
  return {
    v4: () => `mock-uuid-${++id}`,
  };
});

import { getNewItemForItemType } from './get-new-item-for-item-type';
import { DisplayItemType } from './types.d';

describe('getNewItemForItemType', () => {
  it('creates a row with a single column of the given type', () => {
    const item = getNewItemForItemType(DisplayItemType.DroppableBox);

    expect(item).toEqual({
      id: 'mock-uuid-1',
      columns: [
        {
          type: DisplayItemType.DroppableBox,
          id: 'mock-uuid-2',
        },
      ],
    });
  });
});
