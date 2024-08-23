import { PositionIndicesItemList } from '../types.d';
import { getNewItemForItemType } from '../get-new-item-for-item-type';
import { onCompositionChange } from './on-composition-change';

const getIndexFromDroppedRefIdForAbove = (
  droppedRefId: string,
  itemList
): number => {
  const refId = droppedRefId.replace('above-', '');
  return itemList.findIndex((item) => item.id === refId);
};

const getIndexFromDroppedRefIdForBelow = (
  droppedRefId: string,
  itemList
): number => {
  const refId = droppedRefId.replace('below-', '');
  return itemList.findIndex((item) => item.id === refId) + 1;
};

// get the rowId and colId from a string of this format `left-${col.id}-in-${row.id}`,
const getIndexFromDroppedRefIdForLeft = (
  droppedRefId: string,
  itemList
): PositionIndicesItemList => {
  const refId = droppedRefId.replace('left-', '');
  const [colId, rowId] = refId.split('-in-');
  const rowIndex = itemList.findIndex((item) => item.id === rowId);
  return {
    rowIndex,
    colIndex: itemList[rowIndex].columns.findIndex((col) => col.id === colId),
  };
};

const getIndexFromDroppedRefIdForRight = (
  droppedRefId: string,
  itemList
): PositionIndicesItemList => {
  const refId = droppedRefId.replace('right-', '');
  const [colId, rowId] = refId.split('-in-');
  const rowIndex = itemList.findIndex((item) => item.id === rowId);
  return {
    rowIndex,
    colIndex:
      itemList[rowIndex].columns.findIndex((col) => col.id === colId) + 1,
  };
};

export const _addItem = (
  state,
  { payload: { itemTypeToBeAdded, droppedRefId } }
) => {
  let modified = false;
  const prev = [...state.itemList];
  if (!(itemTypeToBeAdded?.length && droppedRefId?.length)) {
    return;
  }
  const newItem = getNewItemForItemType(itemTypeToBeAdded);
  if (state.itemList.length === 0) {
    state.itemList.push(newItem);
    modified = true;
  } else if (droppedRefId.startsWith('above-')) {
    const positionIndex = getIndexFromDroppedRefIdForAbove(
      droppedRefId,
      state.itemList
    );
    state.itemList.splice(positionIndex, 0, newItem);
    modified = true;
  } else if (droppedRefId.startsWith('below-')) {
    const positionIndex = getIndexFromDroppedRefIdForBelow(
      droppedRefId,
      state.itemList
    );
    state.itemList.splice(positionIndex, 0, newItem);
    modified = true;
  } else if (droppedRefId.startsWith('left-')) {
    const positionIndices = getIndexFromDroppedRefIdForLeft(
      droppedRefId,
      state.itemList
    );
    const row = state.itemList[positionIndices.rowIndex];
    row.columns.splice(positionIndices.colIndex, 0, newItem.columns[0]);
    modified = true;
  } else if (droppedRefId.startsWith('right-')) {
    const positionIndices = getIndexFromDroppedRefIdForRight(
      droppedRefId,
      state.itemList
    );
    const row = state.itemList[positionIndices.rowIndex];
    row.columns.splice(positionIndices.colIndex, 0, newItem.columns[0]);
    modified = true;
  }
  if (modified) {
    onCompositionChange(prev, state);
  }
};
