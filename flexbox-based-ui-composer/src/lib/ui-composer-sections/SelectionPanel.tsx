export function SelectionPanel({ title, children }: any) {
  return (
    <div
      className="grow-0"
      style={{
        width: `clamp(450px, 450px, 450px)`,
        margin: `var(--sl-spacing-3x-small)`,
        padding: `var(--sl-spacing-small)`,
        border: `1px solid var(--sl-color-primary-400)`,
        borderRadius: `var(--sl-spacing-small)`,
      }}
    >
      <div>{title}</div>
      <div className="flex flex-column flex-wrap">{children}</div>
    </div>
  );
}
