import { generateUniqueId } from './generate-unique-id';
import { DisplayItemRow, DisplayItemType } from './types.d';

export function getNewStateForDroppableBox(): DisplayItemRow {
  return {
    id: generateUniqueId(),
    columns: [
      {
        type: DisplayItemType.DroppableBox,
        id: generateUniqueId(),
      },
    ],
  };
}
