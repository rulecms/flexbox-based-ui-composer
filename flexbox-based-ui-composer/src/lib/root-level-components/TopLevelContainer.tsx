import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ComposePlaygroundState } from '../redux/compose-playground/types';

export function TopLevelContainer({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  const composeViewPadding = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.uiStyles.composeView.sidePadding
  );
  const backgroundColor = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.uiStyles.composeView.backgroundColor
  );
  return (
    <div
      className="flex flex-row"
      style={{ fontFamily: `var(--sl-font-sans)` }}
    >
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
      <div
        style={{
          height: `calc(100vh - 80px)`,
          overflow: `scroll`,
        }}
        className="flex-1"
      >
        <div className="flex flex-row" style={{ height: `100%` }}>
          <div style={{ width: composeViewPadding, backgroundColor }}></div>
          <div className="flex-1">{right}</div>
          <div style={{ width: composeViewPadding, backgroundColor }}></div>
        </div>
      </div>
    </div>
  );
}