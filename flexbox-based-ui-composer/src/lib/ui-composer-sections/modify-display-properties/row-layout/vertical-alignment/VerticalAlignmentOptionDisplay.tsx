import { DisplayBox } from './DisplayBox';
import { getAlignItemsValue } from './get-align-items-value';
import { AlignItemsValues } from '../../../../redux/compose-playground/types.d';

export const VerticalAlignmentOptionDisplay = ({
  option,
}: {
  option: AlignItemsValues;
}) => {
  const alignItems = getAlignItemsValue(option);
  return (
    <div
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems,
        width: `150px`,
      }}
    >
      <DisplayBox width="10px" height="20px" />
      <DisplayBox width="10px" height="40px" />
      <DisplayBox width="10px" height="20px" />
    </div>
  );
};
