import { onCompositionChange } from './on-composition-change';

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

export const _setRowHorizontalAlignment = (
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
};

export const _setRowVerticalAlignment = (
  state,
  { payload: verticalAlignmentValue }
) => {
  const index = getSelectedRowIndex(state);
  const curr = state.itemList[index].verticalAlignment;
  if (curr === verticalAlignmentValue) {
    return;
  }
  const prev = [...state.itemList];
  state.itemList[index].verticalAlignment = verticalAlignmentValue;
  onCompositionChange(prev, state);
};
