import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import {
  AlignItemsValues,
  DisplayItemType,
  JustifyContentValues,
} from '../redux/compose-playground/types.d';
import { ComposePlayground } from './ComposePlayground';

jest.mock('@dnd-kit/core', () => ({
  useDroppable: () => ({
    setNodeRef: jest.fn(),
    isOver: false,
  }),
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
  }),
}));

describe('ComposePlayground', () => {
  it('shows GetStarted when only one droppable column exists', () => {
    renderWithStore(<ComposePlayground componentList={[]} />);
    expect(screen.getByText('Create Responsive Wireframes')).toBeTruthy();
    expect(screen.queryByTestId('sl-drawer')).toBeNull();
  });

  it('maps rows with DroppableBox, DisplayComponent, defaults, and drawer', () => {
    const rows = [
      {
        id: 'row-1',
        columns: [
          { id: 'col-drop', type: DisplayItemType.DroppableBox },
          { id: 'col-widget', type: 'wired-button' as DisplayItemType },
        ],
      },
      {
        id: 'row-2',
        horizontalAlignment: JustifyContentValues.Center,
        verticalAlignment: AlignItemsValues.FlexEnd,
        columns: [
          { id: 'col-widget-2', type: 'wired-card' as DisplayItemType },
        ],
      },
    ];

    const { container } = renderWithStore(
      <ComposePlayground
        componentList={[
          { id: 'wired-button', card: <div>Button Card</div> },
          { id: 'wired-card', card: <div>Card Widget</div> },
          { id: 'missing', card: <div>unused</div> },
        ]}
      />,
      {
        preloadedComposePlayground: {
          itemList: rows,
          displayItemList: rows,
          isDragState: true,
          selectedDisplayItem: undefined,
        },
      }
    );

    expect(screen.getByText('Button Card')).toBeTruthy();
    expect(screen.getByText('Card Widget')).toBeTruthy();
    expect(screen.queryByTestId('sl-drawer')).toBeNull();

    const rowEls = container.querySelectorAll('.flex.flex-row');
    expect(rowEls.length).toBeGreaterThanOrEqual(2);
    expect((rowEls[0] as HTMLElement).style.justifyContent).toBe(
      JustifyContentValues.FlexStart
    );
    expect((rowEls[0] as HTMLElement).style.alignItems).toBe(
      JustifyContentValues.FlexStart
    );
    expect((rowEls[1] as HTMLElement).style.justifyContent).toBe(
      JustifyContentValues.Center
    );
    expect((rowEls[1] as HTMLElement).style.alignItems).toBe(
      AlignItemsValues.FlexEnd
    );
  });

  it('always mounts ModifyRowOrColumnDrawer when composition started', () => {
    const rows = [
      {
        id: 'row-1',
        columns: [
          { id: 'col-1', type: 'wired-button' as DisplayItemType },
          { id: 'col-2', type: DisplayItemType.DroppableBox },
        ],
      },
    ];
    renderWithStore(
      <ComposePlayground
        componentList={[{ id: 'wired-button', card: <div>Btn</div> }]}
      />,
      {
        preloadedComposePlayground: {
          itemList: rows,
          displayItemList: rows,
          selectedDisplayItem: {
            id: 'col-1',
            containerId: 'row-1',
            componentType: 'wired-button' as DisplayItemType,
          },
        },
      }
    );
    expect(screen.getByTestId('sl-drawer')).toBeTruthy();
    expect(screen.getByText('Change Row Layout')).toBeTruthy();
  });
});
