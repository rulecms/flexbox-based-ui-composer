import { configureStore } from '@reduxjs/toolkit';
import composePlaygroundReducer from './compose-playground/compose-playground-slice';
import { enableMapSet } from 'immer';
enableMapSet();

export default configureStore({
  reducer: {
    composePlayground: composePlaygroundReducer,
  },
})