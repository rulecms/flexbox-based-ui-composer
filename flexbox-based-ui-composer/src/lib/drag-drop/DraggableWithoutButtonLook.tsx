import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function DraggableWithoutButtonLook({
  id,
  children,
}: {
  id: string;
  children: JSX.Element;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });
  const style = {
    display: 'inline-block',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'grab',
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
