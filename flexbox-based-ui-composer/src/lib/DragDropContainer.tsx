import React from 'react';
import { DndContext } from '@dnd-kit/core';

import { addItem } from './redux/compose-playground/compose-playground-slice';

import { MockedUIComposer } from './wired-elements/MockedUIComposer';
import { useDispatch } from 'react-redux';

export function DragDropContainer() {
  const dispatch = useDispatch();

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <MockedUIComposer />
    </DndContext>
  );

  function handleDragEnd(event: any) {
    console.log(event, 'event');
    console.log(event.over, 'event.over');
    if (event?.over?.id) {
      dispatch(
        addItem({
          itemTypeToBeAdded: event.active.id,
          droppedRefId: event.over.id,
        })
      );
    }
  }

  function handleDragStart(event: any) {
    console.log(event, 'event');
  }
}
