import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function DraggableWithoutButtonLook(props: any) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
  });
  const style = {
    display: 'inline-block',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'grab',
  }

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}