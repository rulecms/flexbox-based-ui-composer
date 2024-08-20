import SlDrawer from '@shoelace-style/shoelace/dist/react/drawer';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import { useSelector, useDispatch } from 'react-redux';
import { ComposePlaygroundState } from '../redux/compose-playground/types';
import { setSelectedDisplayItem } from '../redux/compose-playground/compose-playground-slice';

export const SetComponentProperties = () => {
  const dispatch = useDispatch();
  const selectedDisplayItem = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.selectedDisplayItem
  );
  const closeDrawer = () => {
    dispatch(setSelectedDisplayItem(undefined));
  };
  return (
    <SlDrawer
      label="Display Properties"
      open={!!selectedDisplayItem}
      onSlAfterHide={closeDrawer}
    >
      <div>Set Component Properties</div>
      <SlButton onClick={closeDrawer}>Close</SlButton>
    </SlDrawer>
  );
};
