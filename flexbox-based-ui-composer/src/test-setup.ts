// Both wired-elements and display-wired-elements register `rulecms-wired-dialog`.
// Allow re-importing either root without CustomElementRegistry collisions.
const originalDefine = customElements.define.bind(customElements);
customElements.define = ((
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions
) => {
  if (customElements.get(name)) {
    return;
  }
  return originalDefine(name, constructor, options);
}) as typeof customElements.define;

jest.mock('@mui/icons-material/Favorite', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-favorite', ...props }),
  };
});

jest.mock('@mui/icons-material/Close', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-close', ...props }),
  };
});

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

jest.mock('@mui/icons-material', () => {
  const React = require('react');
  return {
    __esModule: true,
    Favorite: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-favorite', ...props }),
    Close: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-close', ...props }),
    ThumbUp: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-thumb-up', ...props }),
    Star: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-star', ...props }),
    Check: (props: Record<string, unknown>) =>
      React.createElement('span', { 'data-testid': 'mui-check', ...props }),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/card/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, ...props }: any) =>
      React.createElement('div', { 'data-testid': 'sl-card', ...props }, children),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/icon/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ name, ...props }: any) =>
      React.createElement('span', {
        'data-testid': `sl-icon-${name || 'default'}`,
        ...props,
      }),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/icon-button/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ name, onClick, disabled, ...props }: any) =>
      React.createElement(
        'button',
        {
          'data-testid': `sl-icon-button-${name || 'default'}`,
          onClick,
          disabled,
          ...props,
        },
        name
      ),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/radio-group/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, onSlChange, value, ...props }: any) =>
      React.createElement(
        'div',
        {
          'data-testid': 'sl-radio-group',
          'data-value': value,
          onClick: (e: any) => {
            if (onSlChange && e.target?.dataset?.radioValue != null) {
              onSlChange({
                target: { value: e.target.dataset.radioValue },
              });
            }
          },
          ...props,
        },
        children
      ),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/radio-button/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, value, ...props }: any) =>
      React.createElement(
        'button',
        {
          type: 'button',
          'data-testid': `sl-radio-button-${value}`,
          'data-radio-value': value,
          ...props,
        },
        children
      ),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/drawer/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, open, onSlAfterHide, label, ...props }: any) =>
      open
        ? React.createElement(
            'div',
            {
              'data-testid': 'sl-drawer',
              'data-label': label,
              ...props,
            },
            children,
            React.createElement(
              'button',
              {
                type: 'button',
                'data-testid': 'sl-drawer-hide',
                onClick: () => onSlAfterHide && onSlAfterHide(),
              },
              'hide'
            )
          )
        : null,
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/checkbox/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, checked, onSlChange, disabled, ...props }: any) =>
      React.createElement(
        'label',
        { 'data-testid': 'sl-checkbox', ...props },
        React.createElement('input', {
          type: 'checkbox',
          checked: !!checked,
          disabled,
          onChange: (e: any) => {
            if (onSlChange) {
              onSlChange({ target: { checked: e.target.checked } });
            }
          },
        }),
        children
      ),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/button/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({
      children,
      onClick,
      disabled,
      outline,
      variant,
      size,
      ...props
    }: any) =>
      React.createElement(
        'button',
        {
          type: 'button',
          'data-testid': 'sl-button',
          onClick,
          disabled,
          'data-outline': outline ? 'true' : undefined,
          'data-variant': variant,
          'data-size': size,
          ...props,
        },
        children
      ),
  };
});

jest.mock('@shoelace-style/shoelace/dist/react/tooltip/index.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, content, ...props }: any) =>
      React.createElement(
        'div',
        { 'data-testid': 'sl-tooltip', 'data-content': content, ...props },
        children
      ),
  };
});
