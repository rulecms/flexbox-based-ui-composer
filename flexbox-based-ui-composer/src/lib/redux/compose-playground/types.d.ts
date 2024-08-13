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

  export type ComposePlaygroundState = {
    itemList: DisplayItemRow[];
  }

  export type PositionIndicesItemList = {
    rowIndex: number;
    colIndex: number
  }