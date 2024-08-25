import { getSelectedRowIndex } from './get-selected-row-index';
import { onCompositionChange } from './on-composition-change';

export const _deleteSelectedRow = (state) => {
  const index = getSelectedRowIndex(state);
  const currRow = state.itemList[index];
  if (!currRow) {
    console.error('No selected row found');
    return;
  }
  const prev = [...state.itemList];
  state.itemList.splice(index, 1);
  onCompositionChange(prev, state);
};
