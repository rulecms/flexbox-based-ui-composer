import { Droppable } from '../Droppable';

export function ComposePlayground({ children }: any) {
const containers = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  return (
    <div
      className="flex auto flex-wrap flex-row"
      style={{ height: `100%`, backgroundColor: `teal` }}
    >
      {containers.map((id) => (
        <Droppable key={id} id={id}>
          <div
            className="flex justify-center items-center"
            style={{
              height: `400px`,
              width: `400px`,
              backgroundColor: `red`,
              margin: `10px`,
              padding: `10px`,
            }}
          >
            {id}
          </div>
        </Droppable>
      ))}
    </div>
  );
}
