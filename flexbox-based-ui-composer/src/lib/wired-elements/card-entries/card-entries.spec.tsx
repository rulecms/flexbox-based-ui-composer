import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@mui/icons-material/ThumbUp', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-thumb-up', ...props }),
  };
});

jest.mock('@mui/icons-material/Star', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-star', ...props }),
  };
});

jest.mock('@mui/icons-material/Check', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-check', ...props }),
  };
});

type Root = 'wired-elements' | 'display-wired-elements';

const roots: Root[] = ['wired-elements', 'display-wired-elements'];

async function loadAllEntries(root: Root) {
  if (root === 'wired-elements') {
    const [
      { buttonEntries },
      { calendarEntries },
      { cardEntries },
      { dialogEntries },
      { dividerEntries },
      { fabEntries },
      { formEntries },
      { iconEntries },
      { linkEntries },
      { mediaEntries },
      { progressEntries },
      { radioButtonEntries },
      { radioGroupEntries },
      { spinnerEntries },
      { tabEntries },
    ] = await Promise.all([
      import('./buttonEntries'),
      import('./calendarEntries'),
      import('./cardEntries'),
      import('./dialogEntries'),
      import('./dividerEntries'),
      import('./fabEntries'),
      import('./formEntries'),
      import('./iconEntries'),
      import('./linkEntries'),
      import('./mediaEntries'),
      import('./progressEntries'),
      import('./radioButtonEntries'),
      import('./radioGroupEntries'),
      import('./spinnerEntries'),
      import('./tabEntries'),
    ]);
    return {
      buttonEntries,
      calendarEntries,
      cardEntries,
      dialogEntries,
      dividerEntries,
      fabEntries,
      formEntries,
      iconEntries,
      linkEntries,
      mediaEntries,
      progressEntries,
      radioButtonEntries,
      radioGroupEntries,
      spinnerEntries,
      tabEntries,
    };
  }

  const [
    { buttonEntries },
    { calendarEntries },
    { cardEntries },
    { dialogEntries },
    { dividerEntries },
    { fabEntries },
    { formEntries },
    { iconEntries },
    { linkEntries },
    { mediaEntries },
    { progressEntries },
    { radioButtonEntries },
    { radioGroupEntries },
    { spinnerEntries },
    { tabEntries },
  ] = await Promise.all([
    import('../../display-wired-elements/card-entries/buttonEntries'),
    import('../../display-wired-elements/card-entries/calendarEntries'),
    import('../../display-wired-elements/card-entries/cardEntries'),
    import('../../display-wired-elements/card-entries/dialogEntries'),
    import('../../display-wired-elements/card-entries/dividerEntries'),
    import('../../display-wired-elements/card-entries/fabEntries'),
    import('../../display-wired-elements/card-entries/formEntries'),
    import('../../display-wired-elements/card-entries/iconEntries'),
    import('../../display-wired-elements/card-entries/linkEntries'),
    import('../../display-wired-elements/card-entries/mediaEntries'),
    import('../../display-wired-elements/card-entries/progressEntries'),
    import('../../display-wired-elements/card-entries/radioButtonEntries'),
    import('../../display-wired-elements/card-entries/radioGroupEntries'),
    import('../../display-wired-elements/card-entries/spinnerEntries'),
    import('../../display-wired-elements/card-entries/tabEntries'),
  ]);
  return {
    buttonEntries,
    calendarEntries,
    cardEntries,
    dialogEntries,
    dividerEntries,
    fabEntries,
    formEntries,
    iconEntries,
    linkEntries,
    mediaEntries,
    progressEntries,
    radioButtonEntries,
    radioGroupEntries,
    spinnerEntries,
    tabEntries,
  };
}

describe.each(roots)('%s card-entries', (root) => {
  it('renders every entry.card and has unique ids', async () => {
    const groups = await loadAllEntries(root);
    const allEntries = Object.values(groups).flat();
    const ids = allEntries.map((e) => e.id);

    expect(new Set(ids).size).toBe(ids.length);

    for (const entry of allEntries) {
      const { container } = render(<>{entry.card}</>);
      expect(container.firstChild).toBeTruthy();
    }
  });
});
