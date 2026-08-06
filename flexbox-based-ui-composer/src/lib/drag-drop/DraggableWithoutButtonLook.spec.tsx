import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';

jest.mock('@dnd-kit/core', () => ({
  useDraggable: () => ({
    attributes: { 'data-draggable': 'true' },
    listeners: { onClick: () => undefined },
    setNodeRef: jest.fn(),
    transform: null,
  }),
  useDroppable: () => ({
    setNodeRef: jest.fn(),
    isOver: false,
  }),
}));

import { DraggableWithoutButtonLook } from './DraggableWithoutButtonLook';

describe('DraggableWithoutButtonLook', () => {
  it('renders children inside a grab cursor button', () => {
    render(
      <DraggableWithoutButtonLook id="drag-1">
        <span>draggable child</span>
      </DraggableWithoutButtonLook>
    );
    expect(screen.getByText('draggable child')).toBeTruthy();
    const button = screen.getByRole('button');
    expect(button.style.cursor).toBe('grab');
    expect(button.style.display).toBe('inline-block');
    expect(button.getAttribute('data-draggable')).toBe('true');
  });
});
