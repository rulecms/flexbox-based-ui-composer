import { useDroppable } from '@dnd-kit/core';
import SlCard from '@shoelace-style/shoelace/dist/react/card';

export const GetStartedContainer: React.FC = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'get-started-container',
  });

  const style = {
    border: isOver ? '3px dashed var(--sl-color-success-600)' : '1px dashed var(--sl-color-neutral-600)',
  };
  return (
    <div
      ref={setNodeRef}
      className="flex flex-1 justify-center items-start"
      style={style}
    >
      <SlCard className="card-header" style={{marginTop: `var(--sl-spacing-4x-large)`}}>
        <div slot="header">
          Welcome to the UI Composer
        </div>
        Start creating your UI by dragging and dropping any widget from the
        sidebar here.
      </SlCard>
    </div>
  );
};