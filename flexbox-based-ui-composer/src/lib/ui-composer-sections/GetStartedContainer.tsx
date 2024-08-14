import { useDroppable } from '@dnd-kit/core';

export const GetStartedContainer: React.FC = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'get-started-container',
  });

  const style = {
    border: isOver ? '3px dashed green' : '1px dashed gray',
    backgroundColor: isOver ? '#cccccc' : 'rgb(92 90 112)',
  };
  const innerStyle = {
    border: '20px solid #eeeeee',
    minHeight: '100px',
    minWidth: '300px',
    marginTop: `50px`,
    padding: `15px`,
    color: `white`,
    backgroundColor: 'rgb(92 90 112)',
  };
  return (
    <div
      ref={setNodeRef}
      className="flex flex-1 justify-center items-start"
      style={style}
    >
      <div className="flex items-center flex-col justify-center" style={innerStyle}>
        <h1>Welcome to the UI Composer</h1>
        <p className="message">
          Start creating your UI by dragging and dropping any widget from the
          sidebar here.
        </p>
      </div>
    </div>
  );
};
