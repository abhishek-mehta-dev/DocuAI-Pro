import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: true,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    showHeader: (state) => {
      state.isVisible = true;
    },
    hideHeader: (state) => {
      state.isVisible = false;
    },
    toggleHeader: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { showHeader, hideHeader, toggleHeader } = headerSlice.actions;
export default headerSlice.reducer;
