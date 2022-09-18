import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState, // internally it wiss assign initialState [line 3] variable as the value to this initialState property
  reducers: {
    logInHandler(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logOutHandler(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
