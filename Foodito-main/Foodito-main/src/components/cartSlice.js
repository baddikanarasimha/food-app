// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cartItems: {}, // Object where the key is the item ID and the value is the quantity
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const id = action.payload;
//       if (state.cartItems[id]) {
//         state.cartItems[id] += 1;  // If item already exists, increment the count
//       } else {
//         state.cartItems[id] = 1;  // Otherwise, add the item with quantity 1
//       }
//     },
//     removeFromCart: (state, action) => {
//       const id = action.payload;
//       if (state.cartItems[id] > 1) {
//         state.cartItems[id] -= 1;  // Decrement the quantity
//       } else {
//         delete state.cartItems[id];  // Remove item if quantity is 0
//       }
//     }
//   }
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;
