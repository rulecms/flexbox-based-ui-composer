import SlDrawer from '@shoelace-style/shoelace/dist/react/drawer/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { ComposePlaygroundState } from '../../redux/compose-playground/types';
import {
  setModifyingRowLayout,
  setSelectedDisplayItem,
} from '../../redux/compose-playground/compose-playground-slice';
import { ModifyRowOrColumn } from './ModifyRowOrColumn';
import { ModifyRowLayout } from './row-layout/ModifyRowLayout';

export const ModifyRowOrColumnDrawer = () => {
  const dispatch = useDispatch();
  const selectedDisplayItem = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.selectedDisplayItem
  );
  const closeDrawer = () => {
    dispatch(setSelectedDisplayItem(undefined));
  };

  const onSetModifyRowLayout = () => {
    dispatch(setModifyingRowLayout());
  };

  if (!selectedDisplayItem) {
    return null;
  }

  const DisplaySelectedOption = () => {
    if (selectedDisplayItem.modifyingRowLayout) {
      return <ModifyRowLayout />;
    }
    return (
      <ModifyRowOrColumn
        onClose={closeDrawer}
        selectedDisplayItem={selectedDisplayItem}
        onSetModifyRowLayout={onSetModifyRowLayout}
      />
    );
  };

  //done this way to avoid typescript error on attribute --size
  const getStyles = () => {
    return {
      ['--size' as any]: '50vw',
    };
  };
  return (
    <SlDrawer
      label="Modify Display"
      open={!!selectedDisplayItem}
      onSlAfterHide={closeDrawer}
      style={getStyles()}
    >
      <DisplaySelectedOption />
    </SlDrawer>
  );
};
