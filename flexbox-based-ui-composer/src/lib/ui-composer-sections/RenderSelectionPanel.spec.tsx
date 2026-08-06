import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { RenderSelectionPanel } from './RenderSelectionPanel';

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

describe('RenderSelectionPanel', () => {
  const entries = [
    { id: 'entry-1', card: <div>Entry One</div> },
    { id: 'entry-2', card: <div>Entry Two</div> },
  ];

  it('returns null when group is hidden', () => {
    const { container } = renderWithStore(
      <RenderSelectionPanel
        cardGroupTitle="Hidden"
        cardTitle="Hidden Card"
        entries={entries}
      />,
      {
        preloadedComposePlayground: {
          selectionCardDisplayStatuses: { Hidden: false },
        },
      }
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders draggables when group is visible', () => {
    renderWithStore(
      <RenderSelectionPanel
        cardGroupTitle="Visible"
        cardTitle="Visible Card"
        entries={entries}
      />,
      {
        preloadedComposePlayground: {
          selectionCardDisplayStatuses: { Visible: true },
        },
      }
    );
    expect(screen.getByText('Visible Card')).toBeTruthy();
    expect(screen.getByText('Entry One')).toBeTruthy();
    expect(screen.getByText('Entry Two')).toBeTruthy();
  });
});
