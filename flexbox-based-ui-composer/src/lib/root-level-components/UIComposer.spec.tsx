import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { UIComposer } from './UIComposer';

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

describe('UIComposer', () => {
  it('renders selection side and compose playground', () => {
    renderWithStore(
      <UIComposer
        cardGroups={[
          {
            title: 'Group A',
            cards: [
              {
                title: 'Card A',
                entries: [
                  { id: 'entry-1', card: <div>Entry Card</div> },
                ],
              },
            ],
          },
        ]}
        cardGroupsInitialState={[
          { cardGroupTitle: 'Group A', displayStatus: true },
        ]}
        componentList={[]}
        displayComponentList={[
          { id: 'entry-1', card: <div>Display Entry</div> },
        ]}
      />
    );
    expect(screen.getByText('Group A')).toBeTruthy();
    expect(screen.getByText('Create Responsive Wireframes')).toBeTruthy();
  });
});
