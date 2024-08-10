export function SelectionPanel({ title, children }: any) {
  return (
    <div
      className="grow-0"
      style={{
        minWidth: `300px`,
        width: `100%`,
        margin: `5px`,
        padding: `10px`,
        border: `1px solid #cccccc`,
        backgroundColor: `lightgray`,
        borderRadius: `4px`,
      }}
    >
      <div>{title}</div>
      <div className="flex flex-column flex-wrap">{children}</div>
    </div>
  );
}
