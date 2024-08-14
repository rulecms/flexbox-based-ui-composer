import { DropContainerDimensions } from '../types.d';

export const getParentContainerDimensions = (
  rowCount: number,
) : DropContainerDimensions => {
  if (rowCount === 1) {
    return {
      height: `100%`,
      width: `100%`,
    };
  }
  return {
    height: `inherit`,
    width: `100%`,
  };
};
