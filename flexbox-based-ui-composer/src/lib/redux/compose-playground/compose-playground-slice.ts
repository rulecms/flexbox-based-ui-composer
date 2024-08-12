import { createSlice } from '@reduxjs/toolkit';
import { getInitialItemList } from './get-initial-item-list';
import { getNewStateForDroppableBox } from './get-new-state-for-droppable-box';

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes.
// Also, no return statement is required from these functions.
export const composePlaygroundSlice = createSlice({
  name: 'composePlayground',
  initialState: {
    activeDroppableItemType: null,
    itemList: getInitialItemList(),
  },
  reducers: {
    addItem: (state, action) => {
      if (
        action.payload.itemTypeToBeAdded?.length &&
        action.payload.addToItemId?.length
      ) {
        state.itemList.map((row) => {
          return row.columns.map((column) => {
            if (
              column.type === 'droppable-box' &&
              column.id === action.payload.addToItemId
            ) {
              column.type = action.payload.itemTypeToBeAdded;
            }
            return column;
          });
        });
        state.itemList.push(getNewStateForDroppableBox());
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = composePlaygroundSlice.actions;

export default composePlaygroundSlice.reducer;
