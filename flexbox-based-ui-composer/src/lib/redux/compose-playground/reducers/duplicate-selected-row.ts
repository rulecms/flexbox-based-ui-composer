import { getDeepCopy } from "../../deep-copy/deep-copy";
import { generateUniqueId } from '../generate-unique-id';
import { getSelectedRowIndex } from './get-selected-row-index';
import { onCompositionChange } from './on-composition-change';

export const _duplicateSelectedRow = (state) => {
  const index = getSelectedRowIndex(state);
  const currRow = state.itemList[index];
  if (!currRow) {
    console.error('No selected row found');
    return;
  }
  const id = generateUniqueId();
  const columns = currRow.columns.map((col) => ({
    ...col,
    id: generateUniqueId(),
  }));
  const newRow = {
    ...currRow,
    id,
    columns,
  };
  const prev = getDeepCopy(state.itemList);
  state.itemList.splice(index, 0, newRow);
  onCompositionChange(prev, state);
};
