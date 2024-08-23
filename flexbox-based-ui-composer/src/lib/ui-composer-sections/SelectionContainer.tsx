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
        paddingLeft: `var(--sl-spacing-small)`,
        paddingRight: `var(--sl-spacing-small)`,
        paddingBottom: `var(--sl-spacing-small)`,
      }}
    >
      <div style={{ display: `flex`, gap: `var(--sl-spacing-2x-small)`, flexDirection: `column`}}>
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
