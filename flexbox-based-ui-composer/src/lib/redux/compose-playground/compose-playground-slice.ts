import { createSlice } from '@reduxjs/toolkit';
import { ComposePlaygroundState, DeviceDisplayType, PositionIndicesItemList } from './types.d';
import { getNewItemForItemType } from './get-new-item-for-item-type';
import { getNewStateForDroppableBox } from './get-new-state-for-droppable-box';
import { _setDeviceDisplayType } from './reducers/device-display-type';
import { _undo, _redo } from './reducers/undo-redo';
import { onCompositionChange } from './reducers/on-composition-change';

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes.
// Also, no return statement is required from these functions.
const initialState: ComposePlaygroundState = {
  itemList: [],
  displayItemList: [getNewStateForDroppableBox()],
  previousItemListStates: [],
  futureItemListStates: [],
  isDragState: false,
  selectionCardDisplayStatuses: {},
  uiStyles: {
    composeView: {
      backgroundColor: 'var(--sl-color-neutral-500)',
      deviceDisplayType: DeviceDisplayType.Desktop,
    },
  },
  selectedDisplayItem: undefined,
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

const getSelectedRowIndex = (state) => {
  if (!state.selectedDisplayItem || !state.selectedDisplayItem.containerId) {
    console.error('No selectedDisplayItem found');
    return -1;
  }
  const index = state.itemList.findIndex(
    (row) => row.id === state.selectedDisplayItem?.containerId
  );
  if (index === -1) {
    console.error('Invalid row for the selected container id');
    return -1;
  }
  return index;
};

export const composePlaygroundSlice = createSlice({
  name: 'composePlayground',
  initialState,
  reducers: {
    undo: _undo,
    redo: _redo,
    setDeviceDisplayType: _setDeviceDisplayType,
    setRowHorizontalAlignment: (
      state,
      { payload: horizontalAlignmentValue }
    ) => {
      const index = getSelectedRowIndex(state);
      const curr = state.itemList[index].horizontalAlignment;
      if(curr === horizontalAlignmentValue) {
        return;
      }
      const prev = [...state.itemList]
      state.itemList[index].horizontalAlignment = horizontalAlignmentValue;
      onCompositionChange(prev, state);
    },
    setRowVerticalAlignment: (
      state,
      { payload: verticalAlignmentValue }
    ) => {
      const index = getSelectedRowIndex(state);
      const curr = state.itemList[index].verticalAlignment;
      if(curr === verticalAlignmentValue) {
        return;
      }
      const prev = [...state.itemList];
      state.itemList[index].verticalAlignment = verticalAlignmentValue;
      onCompositionChange(prev, state);
    },
    setModifyingRowLayout: (state) => {
      if (!state.selectedDisplayItem) {
        console.error('No selectedDisplayItem found');
        return;
      }
      state.selectedDisplayItem.modifyingRowLayout = true;
    },
    deleteComponent: (state, { payload }) => {
      const { id, containerId } = payload;
      const prev = [...state.itemList];
      const index = state.itemList.findIndex((item) => item.id === containerId);
      if (index === -1) {
        console.error('No row item found with id: ', containerId);
        return;
      }
      if (state.itemList[index].columns.length === 1) {
        // delete entire row
        state.itemList.splice(index, 1);
      } else {
        const colIndex = state.itemList[index].columns.findIndex(
          (col) => col.id === id
        );
        if (colIndex === -1) {
          console.error('No column item found with id: ', containerId);
          return;
        }
        state.itemList[index].columns.splice(colIndex, 1);
      }
      onCompositionChange(prev, state);
    },
    setSelectedDisplayItem: (state, action) => {
      state.selectedDisplayItem = action.payload;
    },
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
      const prev = [...state.itemList];
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
        onCompositionChange(prev, state);
      }
    },
    toggleSelectionCardDisplayStatus: (state, action) => {
      const selectionCardId = action.payload;
      const newStatus = !state.selectionCardDisplayStatuses[selectionCardId];
      state.selectionCardDisplayStatuses[selectionCardId] = newStatus;
    },
    switchOnSelectionCardDisplayStatus: (state, action) => {
      const selectionCardId = action.payload;
      state.selectionCardDisplayStatuses[selectionCardId] = true;
    },
    switchOffAllSelectionCardDisplayStatuses: (state) => {
      for (const key in state.selectionCardDisplayStatuses) {
        state.selectionCardDisplayStatuses[key] = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  undo,
  redo,
  addItem,
  deleteComponent,
  setDragStart,
  setDragEnd,
  setDeviceDisplayType,
  setSelectedDisplayItem,
  setRowVerticalAlignment,
  setRowHorizontalAlignment,
  setModifyingRowLayout,
  toggleSelectionCardDisplayStatus,
  switchOnSelectionCardDisplayStatus,
  switchOffAllSelectionCardDisplayStatuses,
} = composePlaygroundSlice.actions;

export default composePlaygroundSlice.reducer;
