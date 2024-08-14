import { useSelector } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { DropContainerDimensions } from './types.d';
import { ComposePlaygroundState } from './redux/compose-playground/types';

export function Droppable({
  id,
  dimensions,
  children,
}: {
  id: string;
  dimensions: DropContainerDimensions;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const isDragState = useSelector(
    (state: { composePlayground: ComposePlaygroundState }) =>
      state.composePlayground.isDragState
  );
  const style = {
    border: isOver ? '3px dashed green' : '1px dashed gray',
    backgroundColor: isOver ? 'rgb(92 90 112)' : '#cccccc',
    display: isDragState ? 'block' : 'none',
    ...dimensions,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
