import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  checkoutData: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    Checkout: (state, action) => {
      state.checkoutData = action.payload;
    },
    logoutState: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginState, logoutState, Checkout } = authSlice.actions;

export default authSlice.reducer;
