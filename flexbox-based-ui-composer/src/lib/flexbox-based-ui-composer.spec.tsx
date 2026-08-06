import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import FlexboxBasedUiComposer from './flexbox-based-ui-composer';

jest.mock('@dnd-kit/core', () => {
  const React = require('react');
  return {
    DndContext: ({ children }: any) =>
      React.createElement('div', { 'data-testid': 'dnd-context' }, children),
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

describe('FlexboxBasedUiComposer', () => {
  it('should render successfully with Provider and composer tree', () => {
    const { baseElement } = render(<FlexboxBasedUiComposer />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('dnd-context')).toBeTruthy();
    expect(screen.getByText('Create Responsive Wireframes')).toBeTruthy();
  });
});
