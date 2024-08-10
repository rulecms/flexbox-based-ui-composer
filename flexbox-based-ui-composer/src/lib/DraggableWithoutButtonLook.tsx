import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function DraggableWithoutButtonLook(props: any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {
    display: 'inline-block',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    cursor: 'grab',
  }

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}