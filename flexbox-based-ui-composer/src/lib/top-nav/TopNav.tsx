import { SetDeviceDisplayType } from './SetDeviceDisplayType';

export const TopNav = () => {
  return (
    <nav
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        padding: `var(--sl-spacing-x-small)`,
        backgroundColor: `var(--sl-color-primary-400)`,
      }}
    >
        <SetDeviceDisplayType />
    </nav>
  );
};
