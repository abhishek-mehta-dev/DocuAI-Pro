"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isError = false;
    },
    clearUser(state) {
      state.user = null;
      state.isError = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state) {
      state.isError = true;
      state.user = null;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
