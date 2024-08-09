import { render } from '@testing-library/react';

import FlexboxBasedUiComposer from './flexbox-based-ui-composer';

describe('FlexboxBasedUiComposer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlexboxBasedUiComposer />);
    expect(baseElement).toBeTruthy();
  });
});
