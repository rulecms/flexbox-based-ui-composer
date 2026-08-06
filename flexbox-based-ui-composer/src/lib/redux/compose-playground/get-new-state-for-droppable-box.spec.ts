jest.mock('uuid', () => {
  let id = 0;
  return {
    v4: () => `mock-uuid-${++id}`,
  };
});

import { getNewStateForDroppableBox } from './get-new-state-for-droppable-box';
import { DisplayItemType } from './types.d';

describe('getNewStateForDroppableBox', () => {
  it('creates a droppable-box row with unique ids', () => {
    expect(getNewStateForDroppableBox()).toEqual({
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
