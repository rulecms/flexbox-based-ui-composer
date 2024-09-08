import { getDeepCopy } from "../../deep-copy/deep-copy";
import { generateUniqueId } from '../generate-unique-id';
import { onCompositionChange } from './on-composition-change';

export const _duplicateItem = (state, { payload: { id, containerId } }) => {
  const rowIndex = state.itemList.findIndex((item) => item.id === containerId);
  if (rowIndex === -1) {
    console.error('No row item found with id: ', containerId);
    return;
  }
  const colIndex = state.itemList[rowIndex].columns.findIndex(
    (col) => col.id === id
  );
  if (colIndex === -1) {
    console.error('No column item found with id: ', id);
    return;
  }
  const col = state.itemList[rowIndex].columns[colIndex];

  const newCol = { ...col, id: generateUniqueId() };

  const prev = getDeepCopy(state.itemList);
  state.itemList[rowIndex].columns.splice(colIndex, 0, newCol);
  onCompositionChange(prev, state);
};
