import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import {
  deleteItem,
  duplicateSelectedRow,
} from '../../redux/compose-playground/compose-playground-slice';
import { useDispatch } from 'react-redux';

export const ModifyRowOrColumn = ({
  onClose,
  selectedDisplayItem,
  onSetModifyRowLayout,
}) => {
  const { id, containerId } = selectedDisplayItem;
  const dispatch = useDispatch();

  const onDeleteItem = () => {
    dispatch(deleteItem({ id, containerId }));
    onClose();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: `var(--sl-spacing-large)`,
      }}
    >
      <SlButton onClick={onSetModifyRowLayout}>Modify Row Layout</SlButton>
      <SlButton onClick={() => dispatch(duplicateSelectedRow())}>
        Duplicate Row
      </SlButton>
      <SlButton onClick={onDeleteItem} variant="danger">
        Delete Component
      </SlButton>
      <SlButton onClick={onClose}>Cancel</SlButton>
    </div>
  );
};
