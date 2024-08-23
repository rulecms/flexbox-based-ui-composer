import SlIconButton from '@shoelace-style/shoelace/dist/react/icon-button';
import SlTooltip from '@shoelace-style/shoelace/dist/react/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import {
  undo,
  redo,
} from '../redux/compose-playground/compose-playground-slice';
import { ComposePlaygroundState } from '../redux/compose-playground/types.d';

const css = `
  .icon-button-color sl-icon-button::part(base) {
    color: var(--sl-color-neutral-800);
  }

  .icon-button-color sl-icon-button::part(base):hover,
  .icon-button-color sl-icon-button::part(base):focus {
    color: var(--sl-color-neutral-950);
  }

  .icon-button-color sl-icon-button::part(base):active {
    color: var(--sl-color-neutral-950);
  }
`;
export const UndoRedo = () => {
  const dispatch = useDispatch();
  const undoListExists = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.previousItemListStates.length
  );
  const redoListExists = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.futureItemListStates.length
  );
  return (
    <div
      style={{ display: `flex`, gap: `var(--sl-spacing-3x-small)` }}
      className="icon-button-color"
    >
      <SlTooltip content="Undo">
        <SlIconButton
          label="Undo"
          name="arrow-counterclockwise"
          onClick={() => dispatch(undo())}
          disabled={!undoListExists}
        />
      </SlTooltip>
      <SlTooltip content="Redo">
        <SlIconButton
          label="Redo"
          name="arrow-clockwise"
          onClick={() => dispatch(redo())}
          disabled={!redoListExists}
        />
      </SlTooltip>
      <style>{css}</style>
    </div>
  );
};
