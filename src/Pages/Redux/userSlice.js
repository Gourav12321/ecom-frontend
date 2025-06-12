// Redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.cart = []; // Clear cart on logout
    },
    
  },
});

export const { setUser, logout} = userSlice.actions;
export default userSlice.reducer;
