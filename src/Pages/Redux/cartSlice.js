import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    decrementCartItem: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        // Update the quantity if the item is already in the cart
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // Add new item to the cart
        state.items.push(action.payload);
      }
    },
    setCart: (state, action) => {
      // Set the entire cart items array
      state.items = action.payload;
    },
  },
});

export const { removeFromCart, updateCartItem, decrementCartItem, addToCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
