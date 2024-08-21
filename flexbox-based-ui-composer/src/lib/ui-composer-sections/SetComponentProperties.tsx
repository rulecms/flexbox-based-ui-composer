import SlDrawer from '@shoelace-style/shoelace/dist/react/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { ComposePlaygroundState } from '../redux/compose-playground/types';
import { setSelectedDisplayItem } from '../redux/compose-playground/compose-playground-slice';
import { ModifyComponentChoices } from './ModifyComponentChoices';

export const SetComponentProperties = () => {
  const dispatch = useDispatch();
  const selectedDisplayItem = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.selectedDisplayItem
  );
  const closeDrawer = () => {
    dispatch(setSelectedDisplayItem(undefined));
  };
  //done this way to avoid typescript error on attribute --size
  const getStyles = () => {
    return {
      ['--size' as any]: '50vw',
    };
  };
  return (
    <SlDrawer
      label="Modify Component Display"
      open={!!selectedDisplayItem}
      onSlAfterHide={closeDrawer}
      style={getStyles()}
    >
      {selectedDisplayItem && (
        <ModifyComponentChoices
          onClose={closeDrawer}
          selectedDisplayItem={selectedDisplayItem}
        />
      )}
    </SlDrawer>
  );
};
