import { DisplayBox } from "./DisplayBox"
import { getJustifyContentValue } from "./get-justify-content-value";
import {
    JustifyContentValues,
  } from '../../../redux/compose-playground/types.d';

export const HorizontalAlignmentOptionDisplay = ({option} : {option: JustifyContentValues}) => {
    const justifyContent = getJustifyContentValue(option);
    return (
        <div style={{ display: `flex`, alignItems: `center`, justifyContent, width: `150px` }}>
            <DisplayBox width="10px" height="20px" />
            <DisplayBox width="10px" height="40px" />
            <DisplayBox width="10px" height="20px" />
        </div>
    );

};