import { getNewStateForDroppableBox } from './get-new-state-for-droppable-box';

export const getInitialItemList = () => {
  return [getNewStateForDroppableBox()];
};
