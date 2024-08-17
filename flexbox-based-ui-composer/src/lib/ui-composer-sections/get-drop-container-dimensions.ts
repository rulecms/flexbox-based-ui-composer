import { DropContainerDimensions } from '../types.d';

export const getDropContainerDimensions = (
  rowCount: number,
  colCount: number
) : DropContainerDimensions => {
  if (rowCount === 1 && colCount === 1) {
    return {
      height: `100%`,
      width: `100%`,
    };
  }
  if(colCount === 1) {
    return {
      height: `100%`,
      width: `100%`,
    };
  }
  return {
    height: `100%`,
    width: `50px`,
  };
};
