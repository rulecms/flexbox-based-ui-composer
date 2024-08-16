import { ReactNode } from "react";
export function SelectionContainer({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: `clamp(450px, 450px, 450px)`,
        padding: `var(--sl-spacing-small)`,
      }}
    >
      <div className="flex flex-column flex-wrap">{children}</div>
    </div>
  );
}
