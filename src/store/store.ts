import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './productSlice'

export const store = configureStore({
  reducer: {
    cart:CartReducer
  }, 
})

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
