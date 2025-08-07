import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import headerReducer from "./headerSlice";
import footerReducer from "./footerSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
    footer: footerReducer,
    message: messageReducer,
  },
});
