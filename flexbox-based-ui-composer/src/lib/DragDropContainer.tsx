import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

import { MockedUIComposer } from './wired-elements/MockedUIComposer';

export function DragDropContainer() {
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <MockedUIComposer />
    </DndContext>
  );

  function handleDragEnd(event: any) {
    console.log(event, 'event');
    console.log(event.over, 'event.over');
  }
};