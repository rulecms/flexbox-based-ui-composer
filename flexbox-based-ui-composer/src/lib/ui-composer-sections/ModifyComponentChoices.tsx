import SlButton from '@shoelace-style/shoelace/dist/react/button';
import { deleteComponent } from '../redux/compose-playground/compose-playground-slice';
import { useDispatch } from 'react-redux';

export const ModifyComponentChoices = ({ onClose, selectedDisplayItem, onSetModifyRowLayout }) => {
  const { id, containerId } = selectedDisplayItem;
  const dispatch = useDispatch();
  const modifyComponentProperties = () => {
    console.log('Callback function for button 1');
  };

  const deleteComponentCallback = () => {
    dispatch(deleteComponent({ id, containerId }));
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
      <SlButton onClick={modifyComponentProperties}>
        Modify Component Properties
      </SlButton>
      <SlButton onClick={onSetModifyRowLayout}>Modify Row Layout</SlButton>
      <SlButton onClick={deleteComponentCallback} variant="danger">
        Delete Component
      </SlButton>
      <SlButton onClick={onClose}>Cancel</SlButton>
    </div>
  );
};
