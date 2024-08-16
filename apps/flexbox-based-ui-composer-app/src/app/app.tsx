// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FlexboxBasedUiComposer } from '@rulecms/flexbox-based-ui-composer';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/cdn/');

export function App() {
  return (
    <FlexboxBasedUiComposer />
  );
}

export default App;
