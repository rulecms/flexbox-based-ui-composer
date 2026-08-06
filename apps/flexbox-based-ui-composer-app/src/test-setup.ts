jest.mock('@rulecms/flexbox-based-ui-composer', () => {
  const React = require('react');
  return {
    __esModule: true,
    FlexboxBasedUiComposer: () =>
      React.createElement('div', {
        'data-testid': 'flexbox-based-ui-composer-mock',
      }),
  };
});

jest.mock('@shoelace-style/shoelace/dist/utilities/base-path', () => ({
  setBasePath: jest.fn(),
}));

jest.mock('@shoelace-style/shoelace/dist/react/avatar/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ image, label }: any) =>
      React.createElement('div', {
        'data-testid': 'sl-avatar',
        'data-image': image,
        'data-label': label,
      }),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/icon/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ name }: any) =>
      React.createElement('span', { 'data-testid': `sl-icon-${name}` }),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/radio-group/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, onSlChange, value }: any) =>
      React.createElement(
        'div',
        {
          'data-testid': 'sl-radio-group',
          'data-value': value,
          onClick: (e: any) => {
            if (onSlChange && e.target?.dataset?.radioValue != null) {
              onSlChange({ target: { value: e.target.dataset.radioValue } });
            }
          },
        },
        children
      ),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/radio-button/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, value }: any) =>
      React.createElement(
        'button',
        {
          type: 'button',
          'data-testid': `sl-radio-button-${value}`,
          'data-radio-value': value,
        },
        children
      ),
  };
});
