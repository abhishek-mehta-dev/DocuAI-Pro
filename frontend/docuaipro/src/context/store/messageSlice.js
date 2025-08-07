import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: null,
    type: "info", // info, success, warning, error
  },
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    clearMessage: (state) => {
      state.message = null;
      state.type = "info";
    },
  },
});

export const { showMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
