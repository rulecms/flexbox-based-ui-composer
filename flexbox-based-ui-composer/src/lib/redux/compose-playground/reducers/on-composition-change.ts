import { getModifiedListWithDroppableContainers } from '../get-modified-list-with-droppable-containers';

export const onCompositionChange = (prevItemList, state) => {
  state.displayItemList = getModifiedListWithDroppableContainers(
    state.itemList
  );
  state.previousItemListStates.push(prevItemList);
  if(state.previousItemListStates.length > 10) {
    state.previousItemListStates.shift();
  }
  state.futureItemListStates = [];
};
