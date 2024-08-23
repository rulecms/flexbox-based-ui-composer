import { getModifiedListWithDroppableContainers } from '../get-modified-list-with-droppable-containers';
export const _undo = (state) => {
  if (!state.previousItemListStates.length) {
    console.error('No previous state to undo to');
    return;
  }
  const futureState = state.itemList;
  const newState = state.previousItemListStates.pop();
  state.itemList = newState;
  state.futureItemListStates.push(futureState);
  state.displayItemList = getModifiedListWithDroppableContainers(
    state.itemList
  );
};

export const _redo = (state) => {
  if (!state.futureItemListStates.length) {
    console.error('No future state to redo to');
    return;
  }
  const pastState = state.itemList;
  const newState = state.futureItemListStates.pop();
  state.itemList = newState;
  state.previousItemListStates.push(pastState);
  state.displayItemList = getModifiedListWithDroppableContainers(
    state.itemList
  );
};
