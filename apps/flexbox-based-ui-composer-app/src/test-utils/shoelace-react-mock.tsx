import React from 'react';

const SlMock = ({ children, ...props }: any) => (
  <div data-testid="sl-mock" {...props}>
    {children}
  </div>
);

export default (props: any) => {
  const { children, onSlChange, value, image, label, name, ...rest } = props;
  if (onSlChange) {
    return (
      <div
        data-testid="sl-radio-group"
        data-value={value}
        onClick={(e: any) => {
          if (e.target?.dataset?.radioValue != null) {
            onSlChange({ target: { value: e.target.dataset.radioValue } });
          }
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
  if (image !== undefined || label !== undefined) {
    return (
      <div data-testid="sl-avatar" data-image={image} data-label={label} {...rest} />
    );
  }
  if (name !== undefined && children === undefined) {
    return <span data-testid={`sl-icon-${name}`} {...rest} />;
  }
  return (
    <button
      type="button"
      data-testid={value != null ? `sl-radio-button-${value}` : 'sl-mock'}
      data-radio-value={value}
      {...rest}
    >
      {children}
    </button>
  );
};
