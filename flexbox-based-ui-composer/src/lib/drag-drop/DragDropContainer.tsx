import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { createPortal } from 'react-dom';

import {
  addItem,
  setDragStart,
  setDragEnd,
} from '../redux/compose-playground/compose-playground-slice';

import { useDispatch } from 'react-redux';

import { UIComposer } from '../root-level-components/UIComposer';

import { cardGroups } from '../wired-elements/component-metadata';
import { cardGroups as displayCardGroups } from '../display-wired-elements/component-metadata';
import {
  getComponentList,
  getCardGroupsInitialState,
} from '../utils/component-metadata-utilities';

const componentList = getComponentList(cardGroups);
const cardGroupsInitialState = getCardGroupsInitialState(cardGroups);

const displayComponentList = getComponentList(displayCardGroups);

export function DragDropContainer() {
  const [activeId, setActiveId] = useState(null);
  const dispatch = useDispatch();

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
    dispatch(setDragStart());
  }

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

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {createPortal(
        <DragOverlay dropAnimation={null} modifiers={[restrictToWindowEdges]}>
          {activeId ? (
            <div style={{ backgroundColor: `var(--sl-color-primary-50)` }}>
              {componentList.find((entry) => entry.id === activeId)?.card ||
                null}
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
      <UIComposer
        cardGroups={cardGroups}
        cardGroupsInitialState={cardGroupsInitialState}
        componentList={componentList}
        displayComponentList={displayComponentList}
      />
    </DndContext>
  );
}
