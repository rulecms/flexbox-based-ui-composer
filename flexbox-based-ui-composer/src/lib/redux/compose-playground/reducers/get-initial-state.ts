import { ComposePlaygroundState, DeviceDisplayType } from '../types.d';
import { getNewStateForDroppableBox } from '../get-new-state-for-droppable-box';

export const getInitialState = (): ComposePlaygroundState => ({
  itemList: [],
  displayItemList: [getNewStateForDroppableBox()],
  previousItemListStates: [],
  futureItemListStates: [],
  isDragState: false,
  selectionCardDisplayStatuses: {},
  uiStyles: {
    composeView: {
      backgroundColor: 'var(--sl-color-neutral-500)',
      deviceDisplayType: DeviceDisplayType.Desktop,
    },
  },
  selectedDisplayItem: undefined,
});
