import { SetDeviceDisplayType } from './SetDeviceDisplayType';
import { UndoRedo } from './UndoRedo';

export const TopNav = () => {
  return (
    <nav
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        padding: `var(--sl-spacing-x-small)`,
        backgroundColor: `var(--sl-color-primary-400)`,
        gap: `var(--sl-spacing-large)`,
      }}
    >
        <SetDeviceDisplayType />
        <UndoRedo />
    </nav>
  );
};
