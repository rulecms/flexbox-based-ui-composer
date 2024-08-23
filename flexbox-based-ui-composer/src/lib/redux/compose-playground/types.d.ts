export enum DisplayItemType {
  DroppableBox = 'droppable-box',
}

export type DisplayItemColumn = {
  id: string;
  type: DisplayItemType;
};

export type DisplayItemRow = {
  id: string;
  horizontalAlignment?: JustifyContentValues;
  verticalAlignment?: AlignItemsValues;
  columns: DisplayItemColumn[];
};

export type ComposeViewStyles = {
  sidePadding: string;
  backgroundColor: string;
};

export type UIStyles = {
  composeView: ComposeViewStyles;
};

export type SelectedDisplayItem = {
  id: string;
  containerId: string;
  componentType: DisplayItemType;
  modifyingRowLayout?: boolean;
};

export type ComposePlaygroundState = {
  itemList: DisplayItemRow[];
  displayItemList: DisplayItemRow[];
  isDragState: boolean;
  selectionCardDisplayStatuses: { [key: string]: boolean };
  uiStyles: UIStyles;
  selectedDisplayItem?: SelectedDisplayItem;
  deviceDisplayType: DeviceDisplayType;
};

export type PositionIndicesItemList = {
  rowIndex: number;
  colIndex: number;
};

export enum JustifyContentValues {
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  SpaceBetween = 'space-between',
  SpaceAround = 'space-around',
  SpaceEvenly = 'space-evenly',
}

export enum AlignItemsValues {
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  Baseline = 'baseline',
  Stretch = 'stretch',
}

export enum DeviceDisplayType {
  Phone = 'phone',
  Tablet = 'tablet',
  Desktop = 'desktop',
}