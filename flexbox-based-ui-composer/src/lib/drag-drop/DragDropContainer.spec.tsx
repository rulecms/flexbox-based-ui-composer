import React from 'react';
import { screen, act } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import {
  dndHandlers,
  resetDndMockState,
} from '../../test-utils/dnd-kit-mock';

jest.mock('@dnd-kit/core', () => {
  const React = require('react');
  const { dndHandlers: handlers } = require('../../test-utils/dnd-kit-mock');
  return {
    DndContext: ({ children, onDragStart, onDragEnd }: any) => {
      handlers.onDragStart = onDragStart;
      handlers.onDragEnd = onDragEnd;
      return React.createElement(
        'div',
        { 'data-testid': 'dnd-context' },
        children
      );
    },
    DragOverlay: ({ children }: any) =>
      React.createElement('div', { 'data-testid': 'drag-overlay' }, children),
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
  };
});

jest.mock('@dnd-kit/modifiers', () => ({
  restrictToWindowEdges: jest.fn(),
}));

jest.mock('../root-level-components/UIComposer', () => ({
  UIComposer: () => <div data-testid="ui-composer-mock" />,
}));

import { DragDropContainer } from './DragDropContainer';

describe('DragDropContainer', () => {
  beforeEach(() => {
    resetDndMockState();
  });

  it('renders dnd context and UIComposer', () => {
    renderWithStore(<DragDropContainer />);
    expect(screen.getByTestId('dnd-context')).toBeTruthy();
    expect(screen.getByTestId('ui-composer-mock')).toBeTruthy();
  });

  it('handleDragStart sets activeId and isDragState', () => {
    const { store } = renderWithStore(<DragDropContainer />);
    act(() => {
      dndHandlers.onDragStart?.({ active: { id: 'wired-button-default' } });
    });
    expect(store.getState().composePlayground.isDragState).toBe(true);
    expect(screen.getByTestId('drag-overlay').textContent).toContain('Click Me');
  });

  it('handleDragEnd with over.id dispatches addItem', () => {
    const { store } = renderWithStore(<DragDropContainer />, {
      preloadedComposePlayground: { itemList: [] },
    });
    act(() => {
      dndHandlers.onDragStart?.({ active: { id: 'wired-button-default' } });
    });
    act(() => {
      dndHandlers.onDragEnd?.({
        active: { id: 'wired-button-default' },
        over: { id: 'get-started-container' },
      });
    });
    expect(store.getState().composePlayground.isDragState).toBe(false);
    // empty itemList path accepts any droppedRefId with length
    expect(store.getState().composePlayground.itemList.length).toBe(1);
  });

  it('handleDragEnd without over only sets drag end', () => {
    const { store } = renderWithStore(<DragDropContainer />, {
      preloadedComposePlayground: { isDragState: true },
    });
    const itemListBefore = store.getState().composePlayground.itemList;
    act(() => {
      dndHandlers.onDragEnd?.({
        active: { id: 'wired-button-default' },
        over: null,
      });
    });
    expect(store.getState().composePlayground.isDragState).toBe(false);
    expect(store.getState().composePlayground.itemList).toEqual(itemListBefore);
  });

  it('overlay shows null card for unknown activeId', () => {
    renderWithStore(<DragDropContainer />);
    act(() => {
      dndHandlers.onDragStart?.({ active: { id: 'unknown-component-id' } });
    });
    const overlay = screen.getByTestId('drag-overlay');
    expect(overlay.querySelector('wired-button')).toBeNull();
    expect(overlay.textContent).toBe('');
  });
});
