import SlButton from '@shoelace-style/shoelace/dist/react/button/index.js';
import SlCard from '@shoelace-style/shoelace/dist/react/card/index.js';

import {
  deleteItem,
  deleteSelectedRow,
  duplicateItem,
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

  const onDuplicateWidget = () => {
    dispatch(duplicateItem({ id, containerId }));
  };

  enum FlexWrap {
    Nowrap = 'nowrap',
    Wrap = 'wrap',
    WrapReverse = 'wrap-reverse',
  }
  const cardStyles = {
    display: 'flex',
    gap: `var(--sl-spacing-small)`,
    flexWrap: FlexWrap.Wrap,
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
      <SlCard
        className="card-header"
        style={{ marginTop: `var(--sl-spacing-4x-small)` }}
      >
        <div slot="header">Row Display</div>
        <div style={cardStyles}>
          <SlButton onClick={onSetModifyRowLayout}>Change Row Layout</SlButton>
          <SlButton onClick={() => dispatch(duplicateSelectedRow())}>
            Duplicate Row
          </SlButton>
          <SlButton
            onClick={() => dispatch(deleteSelectedRow())}
            variant="danger"
          >
            Delete Row
          </SlButton>
        </div>
      </SlCard>
      <SlCard
        className="card-header"
        style={{ marginTop: `var(--sl-spacing-4x-small)` }}
      >
        <div slot="header">Widget Display</div>
        <div style={cardStyles}>
          <SlButton onClick={onDuplicateWidget}>Duplicate Widget</SlButton>
          <SlButton onClick={onDeleteItem} variant="danger">
            Delete Widget
          </SlButton>
        </div>
      </SlCard>
      <SlButton onClick={onClose}>Cancel</SlButton>
    </div>
  );
};
