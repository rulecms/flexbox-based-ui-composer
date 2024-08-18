export enum DisplayItemType {
  DroppableBox = 'droppable-box',
}

export type DisplayItemColumn = {
  id: string;
  type: DisplayItemType;
};

export type DisplayItemRow = {
  id: string;
  columns: DisplayItemColumn[];
};

export type ComposeViewStyles = {
  sidePadding: string;
  backgroundColor: string;
};

export type UIStyles = {
  composeView: ComposeViewStyles;
};

export type ComposePlaygroundState = {
  itemList: DisplayItemRow[];
  displayItemList: DisplayItemRow[];
  isDragState: boolean;
  selectionCardDisplayStatuses: { [key: string]: boolean };
  uiStyles: UIStyles;
};

export type PositionIndicesItemList = {
  rowIndex: number;
  colIndex: number;
};
