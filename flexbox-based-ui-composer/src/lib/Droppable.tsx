import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    border: isOver ? '3px dashed green' : '1px dashed gray',
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}