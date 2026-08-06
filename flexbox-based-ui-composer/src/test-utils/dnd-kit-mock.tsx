import React from 'react';

export const dndHandlers: {
  onDragStart?: (event: any) => void;
  onDragEnd?: (event: any) => void;
} = {};

export const droppableState = { isOver: false };

export const setDroppableIsOver = (value: boolean) => {
  droppableState.isOver = value;
};

export const resetDndMockState = () => {
  dndHandlers.onDragStart = undefined;
  dndHandlers.onDragEnd = undefined;
  droppableState.isOver = false;
};

export const dndKitCoreMock = {
  DndContext: ({ children, onDragStart, onDragEnd }: any) => {
    dndHandlers.onDragStart = onDragStart;
    dndHandlers.onDragEnd = onDragEnd;
    return <div data-testid="dnd-context">{children}</div>;
  },
  DragOverlay: ({ children }: any) => (
    <div data-testid="drag-overlay">{children}</div>
  ),
  useDraggable: () => ({
    attributes: {},
    listeners: { onClick: () => undefined },
    setNodeRef: jest.fn(),
    transform: null,
  }),
  useDroppable: () => ({
    setNodeRef: jest.fn(),
    isOver: droppableState.isOver,
  }),
};

export const dndKitModifiersMock = {
  restrictToWindowEdges: jest.fn(),
};
