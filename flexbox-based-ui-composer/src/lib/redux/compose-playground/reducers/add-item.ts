import { PositionIndicesItemList } from '../types.d';
import { getNewItemForItemType } from '../get-new-item-for-item-type';
import { onCompositionChange } from './on-composition-change';

const getIndexForAbove = (droppedRefId: string, itemList): number => {
  const refId = droppedRefId.replace('above-', '');
  return itemList.findIndex((item) => item.id === refId);
};

const getIndexForBelow = (droppedRefId: string, itemList): number => {
  const refId = droppedRefId.replace('below-', '');
  return itemList.findIndex((item) => item.id === refId) + 1;
};

// get the rowId and colId from a string of this format `left-${col.id}-in-${row.id}`,
const getIndexForLeft = (
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

const getIndexForRight = (
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
  const prev = [...state.itemList];
  if (!(itemTypeToBeAdded?.length && droppedRefId?.length)) {
    return;
  }
  const newItem = getNewItemForItemType(itemTypeToBeAdded);
  if (state.itemList.length === 0) {
    state.itemList.push(newItem);
  } else if (droppedRefId.startsWith('above-')) {
    const positionIndex = getIndexForAbove(droppedRefId, state.itemList);
    state.itemList.splice(positionIndex, 0, newItem);
  } else if (droppedRefId.startsWith('below-')) {
    const positionIndex = getIndexForBelow(droppedRefId, state.itemList);
    state.itemList.splice(positionIndex, 0, newItem);
  } else if (droppedRefId.startsWith('left-')) {
    const { rowIndex, colIndex } = getIndexForLeft(
      droppedRefId,
      state.itemList
    );
    const row = state.itemList[rowIndex];
    row.columns.splice(colIndex, 0, newItem.columns[0]);
  } else if (droppedRefId.startsWith('right-')) {
    const { rowIndex, colIndex } = getIndexForRight(
      droppedRefId,
      state.itemList
    );
    const row = state.itemList[rowIndex];
    row.columns.splice(colIndex, 0, newItem.columns[0]);
  } else {
    return;
  }
  onCompositionChange(prev, state);
};
