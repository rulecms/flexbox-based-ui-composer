import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import composePlaygroundReducer from '../lib/redux/compose-playground/compose-playground-slice';
import { ComposePlaygroundState } from '../lib/redux/compose-playground/types.d';
import { getInitialState } from '../lib/redux/compose-playground/reducers/get-initial-state';

export function createTestStore(
  preloadedComposePlayground?: Partial<ComposePlaygroundState>
) {
  return configureStore({
    reducer: {
      composePlayground: composePlaygroundReducer,
    },
    preloadedState: {
      composePlayground: {
        ...getInitialState(),
        ...preloadedComposePlayground,
      },
    },
  });
}

export function renderWithStore(
  ui: ReactElement,
  {
    preloadedComposePlayground,
    store = createTestStore(preloadedComposePlayground),
    ...renderOptions
  }: {
    preloadedComposePlayground?: Partial<ComposePlaygroundState>;
    store?: ReturnType<typeof createTestStore>;
  } & Omit<RenderOptions, 'wrapper'> = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
