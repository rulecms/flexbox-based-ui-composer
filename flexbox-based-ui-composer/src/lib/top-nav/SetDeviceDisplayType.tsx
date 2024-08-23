import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import SlRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import SlRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';
import { useDispatch, useSelector } from 'react-redux';
import { setDeviceDisplayType } from '../redux/compose-playground/compose-playground-slice';
import {
  ComposePlaygroundState,
  DeviceDisplayType,
} from '../redux/compose-playground/types.d';

export const SetDeviceDisplayType = () => {
  const dispatch = useDispatch();
  const deviceDisplayType = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.uiStyles.composeView.deviceDisplayType
  );
  return (
    <SlRadioGroup
      name="select-device-display"
      value={deviceDisplayType}
      onSlChange={(event: any) =>
        dispatch(setDeviceDisplayType(event.target.value))
      }
    >
      <SlRadioButton value={DeviceDisplayType.Phone}>
        <SlIcon name="phone" />
      </SlRadioButton>
      <SlRadioButton value={DeviceDisplayType.Tablet}>
        <SlIcon name="tablet-landscape" />
      </SlRadioButton>
      <SlRadioButton value={DeviceDisplayType.Desktop}>
        <SlIcon name="pc-display-horizontal" />
      </SlRadioButton>
    </SlRadioGroup>
  );
};
