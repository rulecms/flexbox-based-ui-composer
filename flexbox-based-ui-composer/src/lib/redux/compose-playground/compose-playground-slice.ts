import { createSlice } from '@reduxjs/toolkit';
import { ComposePlaygroundState, DeviceDisplayType } from './types.d';
import { getNewStateForDroppableBox } from './get-new-state-for-droppable-box';
import { _setDeviceDisplayType } from './reducers/device-display-type';
import { _undo, _redo } from './reducers/undo-redo';
import { onCompositionChange } from './reducers/on-composition-change';
import { _addItem } from './reducers/add-item';
import { _deleteItem } from './reducers/delete-item';

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
      if (curr === horizontalAlignmentValue) {
        return;
      }
      const prev = [...state.itemList];
      state.itemList[index].horizontalAlignment = horizontalAlignmentValue;
      onCompositionChange(prev, state);
    },
    setRowVerticalAlignment: (state, { payload: verticalAlignmentValue }) => {
      const index = getSelectedRowIndex(state);
      const curr = state.itemList[index].verticalAlignment;
      if (curr === verticalAlignmentValue) {
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
    deleteItem: _deleteItem,
    setSelectedDisplayItem: (state, action) => {
      state.selectedDisplayItem = action.payload;
    },
    setDragStart: (state) => {
      state.isDragState = true;
    },
    setDragEnd: (state) => {
      state.isDragState = false;
    },
    addItem: _addItem,
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
  deleteItem,
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
