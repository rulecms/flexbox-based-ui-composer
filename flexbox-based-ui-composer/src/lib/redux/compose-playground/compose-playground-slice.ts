import { createSlice } from '@reduxjs/toolkit';
import { ComposePlaygroundState, PositionIndicesItemList } from './types';
import { getNewItemForItemType } from './get-new-item-for-item-type';
import { getModifiedListWithDroppableContainers } from './get-modified-list-with-droppable-containers';
import { getNewStateForDroppableBox } from './get-new-state-for-droppable-box';

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes.
// Also, no return statement is required from these functions.
const initialState: ComposePlaygroundState = {
  itemList: [],
  displayItemList: [getNewStateForDroppableBox()],
  isDragState: false,
};

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

export const composePlaygroundSlice = createSlice({
  name: 'composePlayground',
  initialState,
  reducers: {
    setDragStart: (state) => {
      state.isDragState = true;
    },
    setDragEnd: (state) => {
      state.isDragState = false;
    },
    addItem: (state, action) => {
      const itemType = action.payload.itemTypeToBeAdded;
      const droppedRefId = action.payload.droppedRefId;
      let modified = false;
      if (!(itemType?.length && droppedRefId?.length)) {
        return;
      }
      const newItem = getNewItemForItemType(itemType);
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
        state.displayItemList = getModifiedListWithDroppableContainers(
          state.itemList
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, setDragStart, setDragEnd } =
  composePlaygroundSlice.actions;

export default composePlaygroundSlice.reducer;