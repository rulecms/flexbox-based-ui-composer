import { AlignItemsValues } from '../../../../redux/compose-playground/types.d';

export const getAlignItemsValue = (option: AlignItemsValues) => {
  switch (option) {
    case AlignItemsValues.FlexStart:
      return 'flex-start';
    case AlignItemsValues.Center:
      return 'center';
    case AlignItemsValues.FlexEnd:
      return 'flex-end';
    case AlignItemsValues.Stretch:
      return 'stretch';
    case AlignItemsValues.Baseline:
      return 'baseline';
  }
};
