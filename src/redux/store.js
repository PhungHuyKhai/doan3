import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/couterslice'
import userReducer from './slices/userSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
})