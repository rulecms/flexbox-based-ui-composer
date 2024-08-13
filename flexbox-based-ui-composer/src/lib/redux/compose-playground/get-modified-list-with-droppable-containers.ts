import { getNewStateForDroppableBox } from './get-new-state-for-droppable-box';
import { DisplayItemColumn, DisplayItemRow, DisplayItemType } from './types.d';

// add droppable containers to the left and right of all display components
// also add droppable containers to the top and bottom of all rows
// so that we can drop components in these containers
export const getModifiedListWithDroppableContainers = (
  itemList: DisplayItemRow[]
): DisplayItemRow[] => {
  const returnList: DisplayItemRow[] = [];
  itemList.forEach((row: DisplayItemRow, rowIndex: number) => {
    if (rowIndex === 0) {
      returnList.push({
        id: `row-above-${row.id}`,
        columns: [
          { type: DisplayItemType.DroppableBox, id: `above-${row.id}` },
        ],
      });
    }
    if (!row?.columns?.length) {
      console.error('Invalid row');
      return;
    }
    const cols: DisplayItemColumn[] = [];
    row.columns.forEach((col: DisplayItemColumn, colIndex: number) => {
      if (colIndex === 0) {
        cols.push({
          type: DisplayItemType.DroppableBox,
          id: `left-${col.id}-in-${row.id}`,
        });
      }
      cols.push(col);
      cols.push({
        type: DisplayItemType.DroppableBox,
        id: `right-${col.id}-in-${row.id}`,
      });
    });
    returnList.push({
      id: row.id,
      columns: cols,
    });
    returnList.push({
      id: `row-below-${row.id}`,
      columns: [
        { type: DisplayItemType.DroppableBox, id: `below-${row.id}` },
      ],
    });
  });
  return returnList?.length ? returnList : [getNewStateForDroppableBox()];
};
