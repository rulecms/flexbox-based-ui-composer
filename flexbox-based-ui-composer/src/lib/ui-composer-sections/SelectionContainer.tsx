import { ReactNode } from "react";
export function SelectionContainer({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: `var(--sl-spacing-small)`,
      }}
    >
      <div className="flex flex-column flex-wrap">{children}</div>
    </div>
  );
}
