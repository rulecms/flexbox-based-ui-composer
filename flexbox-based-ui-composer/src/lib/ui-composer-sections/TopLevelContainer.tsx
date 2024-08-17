import { ReactNode } from 'react';
export function TopLevelContainer({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <div
        style={{
          height: `clamp(100vh, 100vh, 100vh)`,
          width: `clamp(500px, 500px, 500px)`,
          overflowY: `scroll`,
          overflowX: `hidden`,
        }}
      >
        {left}
      </div>
      <div style={{
        height: `clamp(100vh, 100vh, 100vh)`,
        overflow: `scroll`,
      }} className="flex-1">{right}</div>
    </div>
  );
}
