import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import SlRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import SlRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';
import { useDispatch } from 'react-redux';
import { setDeviceDisplayType } from '../redux/compose-playground/compose-playground-slice';

export const SetDeviceDisplayType = () => {
  const dispatch = useDispatch();
  return (
    <SlRadioGroup
      name="select-device-display"
      value="desktop"
      onSlChange={(event: any) =>
        dispatch(setDeviceDisplayType(event.target.value))
      }
    >
      <SlRadioButton value="phone">
        <SlIcon name="phone" />
      </SlRadioButton>
      <SlRadioButton value="tablet">
        <SlIcon name="tablet-landscape" />
      </SlRadioButton>
      <SlRadioButton value="desktop">
        <SlIcon name="pc-display-horizontal" />
      </SlRadioButton>
    </SlRadioGroup>
  );
};
