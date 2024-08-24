import SlCard from '@shoelace-style/shoelace/dist/react/card/index.js';
import { useDispatch } from 'react-redux';
import {
  ComposePlaygroundState,
  JustifyContentValues,
} from '../../../../redux/compose-playground/types.d';
import { setRowHorizontalAlignment } from '../../../../redux/compose-playground/compose-playground-slice';
import { useSelector } from 'react-redux';
import { HorizontalAlignmentOptionDisplay } from './HorizontalAlignmentOptionDisplay';

export const HorizontalAlignment = () => {
  const dispatch = useDispatch();
  const currentHorizontalAlignment = useSelector(
    (state: { composePlayground: ComposePlaygroundState }) => {
      const rowId = state.composePlayground.selectedDisplayItem?.containerId;
      if (!rowId) {
        return JustifyContentValues.FlexStart;
      }
      const selectedItem = state.composePlayground.itemList.find(
        (item) => item.id === rowId
      );
      if (!selectedItem) {
        return JustifyContentValues.FlexStart;
      }
      return selectedItem.horizontalAlignment || JustifyContentValues.FlexStart;
    }
  );
  const setHorizontalAlignment = (alignment: string) => {
    dispatch(setRowHorizontalAlignment(alignment));
  };

  const getButtonStyles = (horizontalAlignmentOption: JustifyContentValues) => {
    const borderColor =
      currentHorizontalAlignment === horizontalAlignmentOption
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

  const getTitle = (option: JustifyContentValues) => {
    switch (option) {
      case JustifyContentValues.FlexStart:
        return 'Items are packed toward the start of the row.';
      case JustifyContentValues.Center:
        return 'Items are centered in the row.';
      case JustifyContentValues.FlexEnd:
        return 'Items are packed toward the end of the row.';
      case JustifyContentValues.SpaceBetween:
        return 'Items are evenly distributed in the row, with the first item at the start and the last item at the end.';
      case JustifyContentValues.SpaceAround:
        return 'Items are evenly distributed in the row, with equal space around each item.';
      case JustifyContentValues.SpaceEvenly:
        return 'Items are evenly distributed in the row, with equal space around each item and at the start and end of the row.';
      default:
        return '';
    }
  }
  
  const DisplayOption = ({ option }: { option: JustifyContentValues }) => {
    return (
      <button
        title={getTitle(option)}
        style={getButtonStyles(option)}
        onClick={() => setHorizontalAlignment(option)}
      >
        <HorizontalAlignmentOptionDisplay option={option} />
      </button>
    );
  };

  return (
    <SlCard className="card-header">
      <div slot="header">Horizontal Alignment</div>
      <div style={{ marginBottom: `var(--sl-spacing-small)` }}>
        Click to select how the items in the row should be aligned horizontally.
      </div>
      <DisplayOption option={JustifyContentValues.FlexStart} />
      <DisplayOption option={JustifyContentValues.Center} />
      <DisplayOption option={JustifyContentValues.FlexEnd} />
      <DisplayOption option={JustifyContentValues.SpaceBetween} />
      <DisplayOption option={JustifyContentValues.SpaceAround} />
      <DisplayOption option={JustifyContentValues.SpaceEvenly} />
    </SlCard>
  );
};
