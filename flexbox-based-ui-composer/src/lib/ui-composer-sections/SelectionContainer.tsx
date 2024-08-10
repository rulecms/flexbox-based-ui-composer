export function SelectionContainer({ children }: any) {
  return (
    <div
      style={{
        minWidth: `400px`,
        maxWidth: `450px`,
        padding: `10px`,
        backgroundColor: `darkgray`,
        height: `100%`,
      }}
    >
      <div className="flex flex-column flex-wrap">{children}</div>
    </div>
  );
}
