import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { SelectionContainer } from './SelectionContainer';

jest.mock('@dnd-kit/core', () => ({
  useDraggable: () => ({
    attributes: {},
    listeners: { onClick: () => undefined },
    setNodeRef: jest.fn(),
    transform: null,
  }),
  useDroppable: () => ({
    setNodeRef: jest.fn(),
    isOver: false,
  }),
}));

describe('SelectionContainer', () => {
  it('renders selection choices and visible panels', () => {
    renderWithStore(
      <SelectionContainer
        selectionChoices={<div>choices</div>}
        cardGroups={[
          {
            title: 'Group',
            cards: [
              {
                title: 'Widgets',
                entries: [{ id: 'w1', card: <div>Widget 1</div> }],
              },
            ],
          },
        ]}
      />,
      {
        preloadedComposePlayground: {
          selectionCardDisplayStatuses: { Group: true },
        },
      }
    );
    expect(screen.getByText('choices')).toBeTruthy();
    expect(screen.getByText('Widgets')).toBeTruthy();
    expect(screen.getByText('Widget 1')).toBeTruthy();
  });
});
