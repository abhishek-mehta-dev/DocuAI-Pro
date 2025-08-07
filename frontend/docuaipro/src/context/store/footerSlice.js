import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: true,
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    showFooter: (state) => {
      state.isVisible = true;
    },
    hideFooter: (state) => {
      state.isVisible = false;
    },
    toggleFooter: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { showFooter, hideFooter, toggleFooter } = footerSlice.actions;
export default footerSlice.reducer;
