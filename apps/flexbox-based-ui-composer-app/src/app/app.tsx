// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FlexboxBasedUiComposer } from '@rulecms/flexbox-based-ui-composer';
import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar/index.js';
import SlRadioButton from '@shoelace-style/shoelace/dist/react/radio-button/index.js';
import SlRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group/index.js';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath(
  'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/cdn/'
);

export function App() {
  const modifyTheme = (themeValue: string) => {
    const htmlTagHandle = document.getElementsByTagName('html')[0];
    if (themeValue === 'light') {
      htmlTagHandle.classList.remove('sl-theme-dark');
      htmlTagHandle.classList.add('sl-theme-light');
    } else {
      htmlTagHandle.classList.remove('sl-theme-light');
      htmlTagHandle.classList.add('sl-theme-dark');
    }
  };
  return (
    <>
      <nav
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          padding: `0 var(--sl-spacing-small)`,
        }}
      >
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            gap: `var(--sl-spacing-small)`,
          }}
        >
          <SlAvatar image="/assets/RuleCMS Logo.png" label="RuleCMS" />
          <h1>RuleCMS Wireframe</h1>
        </div>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            gap: `var(--sl-spacing-small)`,
          }}
        >
          <SlRadioGroup
            size="small"
            label=""
            name="theme-selector"
            value="dark"
            onSlChange={(event: any) => modifyTheme(event.target.value)}
          >
            <SlRadioButton value="light">Light</SlRadioButton>
            <SlRadioButton value="dark">Dark</SlRadioButton>
          </SlRadioGroup>
          <a
            href="https://github.com/rulecms/flexbox-based-ui-composer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SlIcon name="github" style={{ fontSize: `32px` }} />
          </a>
        </div>
      </nav>
      <FlexboxBasedUiComposer />
    </>
  );
}

export default App;
