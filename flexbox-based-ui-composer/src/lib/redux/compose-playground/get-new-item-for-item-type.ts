import { generateUniqueId } from './generate-unique-id';
import { DisplayItemRow, DisplayItemType } from './types';

export const getNewItemForItemType = (itemType: DisplayItemType): DisplayItemRow => {
  return {
    id: generateUniqueId(),
    columns: [
      {
        type: itemType,
        id: generateUniqueId(),
      },
    ],
  };
};
