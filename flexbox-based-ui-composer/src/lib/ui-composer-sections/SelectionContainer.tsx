import { ReactNode } from "react";
export function SelectionContainer({ selectionChoices, children }: { selectionChoices: ReactNode, children: ReactNode }) {
  return (
    <div
      style={{
        padding: `var(--sl-spacing-small)`,
      }}
    >
      <div className="flex flex-column flex-wrap">
        {selectionChoices}
        {children}
      </div>
    </div>
  );
}
