import { getDeepCopy } from "../../deep-copy/deep-copy";
import { onCompositionChange } from './on-composition-change';

export const _deleteItem = (state, { payload: { id, containerId } }) => {
  const prev = getDeepCopy(state.itemList);
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
    state.selectedDisplayItem = null;
  }
  onCompositionChange(prev, state);
};
