// src/store.js
import { configureStore, createReducer } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import useReducer from './features/userSlice';
import cartReducer from './features/cartSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: useReducer,
    cart: cartReducer
  },
});
