import { ReactNode } from 'react';
import { RenderSelectionPanel } from './RenderSelectionPanel';
import { CardGroup } from '../types';
export function SelectionContainer({
  selectionChoices,
  cardGroups,
}: {
  selectionChoices: ReactNode;
  cardGroups: CardGroup[];
}) {
  return (
    <div
      style={{
        padding: `var(--sl-spacing-small)`,
      }}
    >
      <div className="flex flex-column flex-wrap">
        {selectionChoices}
        {cardGroups.map(({ title: cardGroupTitle, cards }) => {
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
        })}
      </div>
    </div>
  );
}
