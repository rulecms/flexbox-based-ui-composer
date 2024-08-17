import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

import {
  addItem,
  setDragStart,
  setDragEnd,
} from './redux/compose-playground/compose-playground-slice';

import { MockedUIComposer } from './wired-elements/MockedUIComposer';
import { useDispatch } from 'react-redux';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DisplayComponentBasedOnType } from './wired-elements/DisplayComponentBasedOnType';

export function DragDropContainer() {
  const [activeId, setActiveId] = useState(null);
  const dispatch = useDispatch();

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {createPortal(
        <DragOverlay dropAnimation={null} modifiers={[restrictToWindowEdges]}>
          {activeId ? (
            <div style={{backgroundColor: `var(--sl-color-primary-50)`}}>
              <DisplayComponentBasedOnType type={activeId} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
      <MockedUIComposer />
    </DndContext>
  );

  function handleDragEnd(event: any) {
    dispatch(setDragEnd());
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
    setActiveId(event.active.id);
    dispatch(setDragStart());
  }
}
