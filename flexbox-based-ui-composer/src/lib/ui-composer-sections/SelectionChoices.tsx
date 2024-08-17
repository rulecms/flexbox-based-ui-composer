import SlCheckbox from '@shoelace-style/shoelace/dist/react/checkbox';
import SlCard from '@shoelace-style/shoelace/dist/react/card';
import {
  toggleSelectionCardDisplayStatus,
  switchOnSelectionCardDisplayStatus,
} from '../redux/compose-playground/compose-playground-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SelectionCardDisplayStatus } from '../types';
import { ComposePlaygroundState } from '../redux/compose-playground/types';

export const SelectionChoices = ({
  cardGroupsInitialState,
}: {
  cardGroupsInitialState: SelectionCardDisplayStatus[];
}) => {
  const dispatch = useDispatch();
  const selectionCardDisplayStatuses = useSelector(
    (state: { composePlayground: ComposePlaygroundState }) =>
      state.composePlayground.selectionCardDisplayStatuses
  );
  const visibleDisplayCardGroupTitles = Object.keys(selectionCardDisplayStatuses).filter( (key) => selectionCardDisplayStatuses[key] === true);
  useEffect(() => {
    cardGroupsInitialState
      .filter(({ displayStatus }) => displayStatus === true)
      .forEach(({ cardGroupTitle }) => {
        dispatch(switchOnSelectionCardDisplayStatus(cardGroupTitle));
      });
  }, [cardGroupsInitialState, dispatch]);
  const onselectionchange = (name: string) => {
    dispatch(toggleSelectionCardDisplayStatus(name));
  };
  return (
    <SlCard
      style={{
        width: `clamp(450px, 450px, 450px)`,
        marginBottom: `var(--sl-spacing-x-small)`,
      }}
    >
      {cardGroupsInitialState.map(({ cardGroupTitle }) => (
        <SlCheckbox
          key={cardGroupTitle}
          name={cardGroupTitle}
          value={cardGroupTitle}
          onSlChange={() => onselectionchange(cardGroupTitle)}
          style={{
            marginBottom: `var(--sl-spacing-x-small)`,
            marginRight: `var(--sl-spacing-small)`,
          }}
          checked={visibleDisplayCardGroupTitles.includes(cardGroupTitle)}
        >
          {cardGroupTitle}
        </SlCheckbox>
      ))}
    </SlCard>
  );
};
