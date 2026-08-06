import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { DeviceDisplayType } from '../redux/compose-playground/types.d';
import { SetDeviceDisplayType } from './SetDeviceDisplayType';

describe('SetDeviceDisplayType', () => {
  it('dispatches phone, tablet, and desktop changes', () => {
    const { store } = renderWithStore(<SetDeviceDisplayType />);

    fireEvent.click(screen.getByTestId('sl-radio-button-phone'));
    expect(
      store.getState().composePlayground.uiStyles.composeView.deviceDisplayType
    ).toBe(DeviceDisplayType.Phone);

    fireEvent.click(screen.getByTestId('sl-radio-button-tablet'));
    expect(
      store.getState().composePlayground.uiStyles.composeView.deviceDisplayType
    ).toBe(DeviceDisplayType.Tablet);

    fireEvent.click(screen.getByTestId('sl-radio-button-desktop'));
    expect(
      store.getState().composePlayground.uiStyles.composeView.deviceDisplayType
    ).toBe(DeviceDisplayType.Desktop);
  });
});
