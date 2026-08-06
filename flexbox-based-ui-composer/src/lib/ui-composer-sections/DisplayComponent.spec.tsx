import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { DisplayComponent } from './DisplayComponent';

describe('DisplayComponent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns null when children is null', () => {
    const { container } = renderWithStore(
      <DisplayComponent id="c1" containerId="r1" componentType="wired-button">
        {null}
      </DisplayComponent>
    );
    expect(container.firstChild).toBeNull();
  });

  it('dispatches setSelectedDisplayItem on click', () => {
    const { store } = renderWithStore(
      <DisplayComponent id="c1" containerId="r1" componentType="wired-button">
        <span>widget</span>
      </DisplayComponent>
    );
    fireEvent.click(screen.getByText('widget'));
    expect(store.getState().composePlayground.selectedDisplayItem).toEqual({
      id: 'c1',
      containerId: 'r1',
      componentType: 'wired-button',
    });
  });

  it('sets pointer-events none when video shadowRoot controls exist', async () => {
    const controls = document.createElement('div');
    controls.id = 'controls';
    const shadowHost = document.createElement('div');
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(controls);

    const video = document.createElement('wired-video');
    Object.defineProperty(video, 'shadowRoot', {
      get: () => shadowRoot,
    });

    const querySpy = jest
      .spyOn(document, 'querySelector')
      .mockImplementation((selector: string) => {
        if (selector === '#displayComponentvid1 wired-video') {
          return video as unknown as Element;
        }
        return null;
      });

    renderWithStore(
      <DisplayComponent id="vid1" containerId="r1" componentType="wired-video">
        <span>video</span>
      </DisplayComponent>
    );

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    expect(controls.getAttribute('style')).toBe('pointer-events: none');
    querySpy.mockRestore();
  });

  it('handles absent video shadowRoot without error', async () => {
    const querySpy = jest
      .spyOn(document, 'querySelector')
      .mockReturnValue(null);

    renderWithStore(
      <DisplayComponent id="vid2" containerId="r1" componentType="wired-video">
        <span>no video</span>
      </DisplayComponent>
    );

    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByText('no video')).toBeTruthy();
    querySpy.mockRestore();
  });
});
