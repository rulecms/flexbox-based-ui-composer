import { ReactNode } from 'react';
export function TopLevelContainer({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="flex flex-row" style={{ fontFamily: `var(--sl-font-sans)` }}>
      <div
        style={{
          height: `calc(100vh - 80px)`,
          width: `clamp(500px, 500px, 500px)`,
          overflowY: `scroll`,
          overflowX: `hidden`,
        }}
      >
        {left}
      </div>
      <div style={{
        height: `calc(100vh - 80px)`,
        overflow: `scroll`,
      }} className="flex-1">{right}</div>
    </div>
  );
}
