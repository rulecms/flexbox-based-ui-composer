import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { ComposePlaygroundContainer } from './ComposePlayground.container';

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

describe('ComposePlaygroundContainer', () => {
  it('wraps ComposePlayground', () => {
    renderWithStore(<ComposePlaygroundContainer componentList={[]} />);
    expect(screen.getByText('Create Responsive Wireframes')).toBeTruthy();
  });
});
