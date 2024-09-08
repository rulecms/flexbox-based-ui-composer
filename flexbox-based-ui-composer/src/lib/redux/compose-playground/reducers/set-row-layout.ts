import { getDeepCopy } from "../../deep-copy/deep-copy";
import { onCompositionChange } from './on-composition-change';
import { getSelectedRowIndex } from './get-selected-row-index';

export const _setRowHorizontalAlignment = (
  state,
  { payload: horizontalAlignmentValue }
) => {
  const index = getSelectedRowIndex(state);
  const curr = state.itemList[index].horizontalAlignment;
  if (curr === horizontalAlignmentValue) {
    return;
  }
  const prev = getDeepCopy(state.itemList);
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
  const prev = getDeepCopy(state.itemList);
  state.itemList[index].verticalAlignment = verticalAlignmentValue;
  onCompositionChange(prev, state);
};
