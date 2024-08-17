import { SelectionPanel } from '../ui-composer-sections/SelectionPanel';
import { DraggableWiredElement } from './DraggableWiredElement';
import { useSelector } from 'react-redux';

import { cardGroups } from './card-groups';

function RenderSelectionPanel({
  title,
  entries,
}: {
  title: string;
  entries: { id: string; card: JSX.Element }[];
}) {
  const displayStatus = useSelector(
    (state: { composePlayground }) =>
      state.composePlayground.selectionCardDisplayStatuses
  );

  function displayOn() {
    let result = false;
    cardGroups.forEach(({ title: cardGroupsTitle, cards }) => {
      const cardTitles = cards.map(({ title }) => title);
      if (cardTitles.includes(title)) {
        result = !!displayStatus[cardGroupsTitle];
      }
    });
    return result;
  }

  if (!displayOn()) {
    return null;
  }
  return (
    <SelectionPanel title={title}>
      {entries.map((entry) => (
        <div key={`${entry.id}-container`}>
          <DraggableWiredElement
            key={entry.id}
            id={entry.id}
            card={entry.card}
          />
        </div>
      ))}
    </SelectionPanel>
  );
}

export function WiredElementsContainer() {
  return cardGroups.map(({ cards }) => {
    return cards.map(({ title, entries }) => {
      return <RenderSelectionPanel key={title} title={title} entries={entries} />;
    });
  });
}
