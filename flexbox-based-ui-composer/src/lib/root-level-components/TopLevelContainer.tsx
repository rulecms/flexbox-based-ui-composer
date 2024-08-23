import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import {
  ComposePlaygroundState,
  DeviceDisplayType,
} from '../redux/compose-playground/types.d';
import { TopNav } from '../top-nav/TopNav';

export function TopLevelContainer({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  const deviceDisplayType = useSelector(
    ({ composePlayground }: { composePlayground: ComposePlaygroundState }) =>
      composePlayground.uiStyles.composeView.deviceDisplayType
  );

  const getWidthBasedOnDeviceDisplayType = () => {
    switch (deviceDisplayType) {
      case DeviceDisplayType.Phone:
        return `400px`;
      case DeviceDisplayType.Tablet:
        return `820px`;
      case DeviceDisplayType.Desktop:
        return `1200px`;
    }
  };

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
          display: `flex`,
          flexDirection: `column`,
        }}
        className="flex-1"
      >
        <TopNav />
        <div className="flex flex-row" style={{ flexGrow: 1 }}>
          <div style={{ backgroundColor, flexGrow: 1 }} />
          <div
            className="flex-1"
            style={{
              minWidth: getWidthBasedOnDeviceDisplayType(),
              overflow: `hidden`,
            }}
          >
            {right}
          </div>
          <div style={{ backgroundColor, flexGrow: 1 }} />
        </div>
      </div>
    </div>
  );
}
