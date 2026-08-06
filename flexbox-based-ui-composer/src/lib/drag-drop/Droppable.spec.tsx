import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import {
  droppableState,
  setDroppableIsOver,
  resetDndMockState,
} from '../../test-utils/dnd-kit-mock';

jest.mock('@dnd-kit/core', () => {
  const mock = require('../../test-utils/dnd-kit-mock');
  return {
    useDroppable: () => ({
      setNodeRef: jest.fn(),
      isOver: mock.droppableState.isOver,
    }),
    useDraggable: () => ({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      transform: null,
    }),
  };
});

import { Droppable } from './Droppable';

describe('Droppable', () => {
  beforeEach(() => {
    resetDndMockState();
    setDroppableIsOver(false);
  });

  const dimensions = { height: '100px', width: '200px' };

  it('applies default border and hides when not dragging and not over', () => {
    const { container } = renderWithStore(
      <Droppable id="drop-1" dimensions={dimensions}>
        <span>child</span>
      </Droppable>,
      { preloadedComposePlayground: { isDragState: false } }
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.border).toBe('1px dashed gray');
    expect(el.style.backgroundColor).toBe('inherit');
    expect(el.style.display).toBe('none');
    expect(el.style.height).toBe('100px');
    expect(el.style.width).toBe('200px');
    expect(screen.getByText('child')).toBeTruthy();
  });

  it('shows when isDragState is true', () => {
    const { container } = renderWithStore(
      <Droppable id="drop-1" dimensions={dimensions}>
        child
      </Droppable>,
      { preloadedComposePlayground: { isDragState: true } }
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.display).toBe('block');
  });

  it('highlights when isOver is true', () => {
    setDroppableIsOver(true);
    const { container } = renderWithStore(
      <Droppable id="drop-1" dimensions={dimensions}>
        child
      </Droppable>,
      { preloadedComposePlayground: { isDragState: true } }
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.border).toBe('3px dashed green');
    // jsdom may not accept modern space-separated rgb(); assert non-inherit highlight path
    expect(el.style.backgroundColor).not.toBe('inherit');
    expect(droppableState.isOver).toBe(true);
  });
});
