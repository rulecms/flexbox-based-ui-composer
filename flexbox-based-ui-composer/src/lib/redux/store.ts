import { configureStore } from '@reduxjs/toolkit'
import composePlaygroundReducer from './compose-playground/compose-playground-slice'

export default configureStore({
  reducer: {
    composePlayground: composePlaygroundReducer,
  },
})