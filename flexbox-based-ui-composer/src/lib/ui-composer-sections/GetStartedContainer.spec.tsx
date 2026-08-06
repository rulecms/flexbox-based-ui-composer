import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import {
  setDroppableIsOver,
  resetDndMockState,
  droppableState,
} from '../../test-utils/dnd-kit-mock';

jest.mock('@dnd-kit/core', () => {
  const mock = require('../../test-utils/dnd-kit-mock');
  return {
    useDroppable: () => ({
      setNodeRef: jest.fn(),
      isOver: mock.droppableState.isOver,
    }),
  };
});

import { GetStartedContainer } from './GetStartedContainer';

describe('GetStartedContainer', () => {
  beforeEach(() => {
    resetDndMockState();
  });

  it('renders get started content when not over', () => {
    render(<GetStartedContainer />);
    expect(screen.getByText('Create Responsive Wireframes')).toBeTruthy();
    expect(screen.getByText(/dragging and dropping/i)).toBeTruthy();
    expect(droppableState.isOver).toBe(false);
  });

  it('renders when isOver is true (highlight branch)', () => {
    setDroppableIsOver(true);
    render(<GetStartedContainer />);
    expect(screen.getByText('Create Responsive Wireframes')).toBeTruthy();
    expect(droppableState.isOver).toBe(true);
  });
});
