import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState, // internally it wiss assign initialState [line 3] variable as the value to this initialState property
  reducers: {
    logInHandler(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.userData;
      state.token = action.payload.token;
    },
    logOutHandler(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.token = "";
    },
    updateHighScore(state, action) {
      state.user.highScore = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
