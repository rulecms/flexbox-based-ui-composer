import { createSlice } from '@reduxjs/toolkit';
import { _setDeviceDisplayType } from './reducers/device-display-type';
import { _undo, _redo } from './reducers/undo-redo';
import { _addItem } from './reducers/add-item';
import { _deleteItem } from './reducers/delete-item';
import {
  _setRowHorizontalAlignment,
  _setRowVerticalAlignment,
} from './reducers/set-row-layout';
import { getInitialState } from './reducers/get-initial-state';
import { _duplicateSelectedRow } from './reducers/duplicate-selected-row';
import { _deleteSelectedRow } from './reducers/delete-selected-row';
import { _duplicateItem } from './reducers/duplicate-item';

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes.
// Also, no return statement is required from these functions.
export const composePlaygroundSlice = createSlice({
  name: 'composePlayground',
  initialState: getInitialState(),
  reducers: {
    undo: _undo,
    redo: _redo,
    addItem: _addItem,
    deleteItem: _deleteItem,
    duplicateItem: _duplicateItem,
    setDeviceDisplayType: _setDeviceDisplayType,
    deleteSelectedRow: _deleteSelectedRow,
    duplicateSelectedRow: _duplicateSelectedRow,
    setRowHorizontalAlignment: _setRowHorizontalAlignment,
    setRowVerticalAlignment: _setRowVerticalAlignment,
    setModifyingRowLayout: (state) => {
      if (!state.selectedDisplayItem) {
        console.error('No selectedDisplayItem found');
        return;
      }
      state.selectedDisplayItem.modifyingRowLayout = true;
    },
    setSelectedDisplayItem: (state, { payload: selectedDisplayItem }) => {
      state.selectedDisplayItem = selectedDisplayItem;
    },
    setDragStart: (state) => {
      state.isDragState = true;
    },
    setDragEnd: (state) => {
      state.isDragState = false;
    },
    toggleSelectionCardDisplayStatus: (state, { payload: selectionCardId }) => {
      const newStatus = !state.selectionCardDisplayStatuses[selectionCardId];
      state.selectionCardDisplayStatuses[selectionCardId] = newStatus;
    },
    switchOnSelectionCardDisplayStatus: (
      state,
      { payload: selectionCardId }
    ) => {
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
  setDragEnd,
  setDragStart,
  duplicateItem,
  deleteSelectedRow,
  setDeviceDisplayType,
  duplicateSelectedRow,
  setModifyingRowLayout,
  setSelectedDisplayItem,
  setRowVerticalAlignment,
  setRowHorizontalAlignment,
  toggleSelectionCardDisplayStatus,
  switchOnSelectionCardDisplayStatus,
  switchOffAllSelectionCardDisplayStatuses,
} = composePlaygroundSlice.actions;

export default composePlaygroundSlice.reducer;
