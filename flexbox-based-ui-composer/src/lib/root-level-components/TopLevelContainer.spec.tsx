import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { DeviceDisplayType } from '../redux/compose-playground/types.d';
import { TopLevelContainer } from './TopLevelContainer';

jest.mock('../top-nav/TopNav', () => ({
  TopNav: () => <div data-testid="top-nav-mock" />,
}));

describe('TopLevelContainer', () => {
  it('uses Phone width 400px', () => {
    const { container } = renderWithStore(
      <TopLevelContainer left={<div>left</div>} right={<div>right</div>} />,
      {
        preloadedComposePlayground: {
          uiStyles: {
            composeView: {
              backgroundColor: 'red',
              deviceDisplayType: DeviceDisplayType.Phone,
            },
          },
        },
      }
    );
    expect(screen.getByText('left')).toBeTruthy();
    expect(screen.getByText('right')).toBeTruthy();
    expect(screen.getByTestId('top-nav-mock')).toBeTruthy();
    const widthEl = Array.from(container.querySelectorAll('div')).find(
      (el) => el.style.maxWidth === '400px'
    );
    expect(widthEl).toBeTruthy();
    expect(widthEl?.style.minWidth).toBe('400px');
    expect(widthEl?.style.width).toBe('400px');
  });

  it('uses Tablet width 820px', () => {
    const { container } = renderWithStore(
      <TopLevelContainer left={<span />} right={<span />} />,
      {
        preloadedComposePlayground: {
          uiStyles: {
            composeView: {
              backgroundColor: 'blue',
              deviceDisplayType: DeviceDisplayType.Tablet,
            },
          },
        },
      }
    );
    const widthEl = Array.from(container.querySelectorAll('div')).find(
      (el) => el.style.maxWidth === '820px'
    );
    expect(widthEl).toBeTruthy();
  });

  it('uses Desktop width 1200px', () => {
    const { container } = renderWithStore(
      <TopLevelContainer left={<span />} right={<span />} />,
      {
        preloadedComposePlayground: {
          uiStyles: {
            composeView: {
              backgroundColor: 'green',
              deviceDisplayType: DeviceDisplayType.Desktop,
            },
          },
        },
      }
    );
    const widthEl = Array.from(container.querySelectorAll('div')).find(
      (el) => el.style.maxWidth === '1200px'
    );
    expect(widthEl).toBeTruthy();
  });
});
