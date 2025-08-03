// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice' // Adjust the path to where your CartSlice is located

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add other reducers if necessary
  },
});

export default store;
