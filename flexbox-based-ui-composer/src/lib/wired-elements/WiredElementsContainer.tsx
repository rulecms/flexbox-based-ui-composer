import { RenderSelectionPanel } from '../ui-composer-sections/RenderSelectionPanel';
import { cardGroups } from './card-groups';

export function WiredElementsContainer() {
  return cardGroups.map(({ title: cardGroupTitle, cards }) => {
    return cards.map(({ title: cardTitle, entries }) => {
      return (
        <RenderSelectionPanel
          key={cardTitle}
          cardTitle={cardTitle}
          entries={entries}
          cardGroupTitle={cardGroupTitle}
        />
      );
    });
  });
}
