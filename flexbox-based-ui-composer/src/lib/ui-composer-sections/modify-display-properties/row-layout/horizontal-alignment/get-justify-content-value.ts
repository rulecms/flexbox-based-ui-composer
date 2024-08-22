import { JustifyContentValues } from '../../../../redux/compose-playground/types.d';
export const getJustifyContentValue = (option: JustifyContentValues) => {
  switch (option) {
    case JustifyContentValues.FlexStart:
      return 'flex-start';
    case JustifyContentValues.Center:
      return 'center';
    case JustifyContentValues.FlexEnd:
      return 'flex-end';
    case JustifyContentValues.SpaceBetween:
      return 'space-between';
    case JustifyContentValues.SpaceAround:
      return 'space-around';
    case JustifyContentValues.SpaceEvenly:
      return 'space-evenly';
    default:
      return 'flex-start';
  }
};
