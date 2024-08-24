import SlCard from '@shoelace-style/shoelace/dist/react/card/index.js';
import { useDispatch } from 'react-redux';
import {
  ComposePlaygroundState,
  AlignItemsValues,
} from '../../../../redux/compose-playground/types.d';
import { setRowVerticalAlignment } from '../../../../redux/compose-playground/compose-playground-slice';
import { useSelector } from 'react-redux';
import { VerticalAlignmentOptionDisplay } from './VerticalAlignmentOptionDisplay';

export const VerticalAlignment = () => {
  const dispatch = useDispatch();
  const currentVerticalAlignment = useSelector(
    (state: { composePlayground: ComposePlaygroundState }) => {
      const rowId = state.composePlayground.selectedDisplayItem?.containerId;
      if (!rowId) {
        return AlignItemsValues.FlexStart;
      }
      const selectedItem = state.composePlayground.itemList.find(
        (item) => item.id === rowId
      );
      if (!selectedItem) {
        return AlignItemsValues.FlexStart;
      }
      return selectedItem.verticalAlignment || AlignItemsValues.FlexStart;
    }
  );
  const setVerticalAlignment = (alignment: string) => {
    dispatch(setRowVerticalAlignment(alignment));
  };

  const getButtonStyles = (verticalAlignmentOption: AlignItemsValues) => {
    const borderColor =
      currentVerticalAlignment === verticalAlignmentOption
        ? 'var(--sl-color-success-400)'
        : 'var(--sl-color-neutral-400)';
    return {
      marginRight: `var(--sl-spacing-small)`,
      marginBottom: `var(--sl-spacing-small)`,
      background: 'transparent',
      border: `1px solid ${borderColor}`,
      padding: 0,
      display: 'inline-block',
      cursor: 'pointer',
    };
  };

  const getTitle = (option: AlignItemsValues) => {
    switch (option) {
      case AlignItemsValues.FlexStart:
        return 'Align items to the start of the container';
      case AlignItemsValues.Center:
        return 'Align items to the center of the container';
      case AlignItemsValues.FlexEnd:
        return 'Align items to the end of the container';
      case AlignItemsValues.Baseline:
        return 'Align items along the baseline of the container';
      case AlignItemsValues.Stretch:
        return 'Stretch items to fill the container';
      default:
        return '';
    }
  };

  const DisplayOption = ({ option }: { option: AlignItemsValues }) => {
    return (
      <button
        title={getTitle(option)}
        style={getButtonStyles(option)}
        onClick={() => setVerticalAlignment(option)}
      >
        <VerticalAlignmentOptionDisplay option={option} />
      </button>
    );
  };

  return (
    <SlCard className="card-header">
      <div slot="header">Vertical Alignment</div>
      <div style={{ marginBottom: `var(--sl-spacing-small)` }}>
        Click to select how the items in the row should be aligned vertically.
      </div>
      <DisplayOption option={AlignItemsValues.FlexStart} />
      <DisplayOption option={AlignItemsValues.Center} />
      <DisplayOption option={AlignItemsValues.FlexEnd} />
      <DisplayOption option={AlignItemsValues.Baseline} />
      <DisplayOption option={AlignItemsValues.Stretch} />
    </SlCard>
  );
};
