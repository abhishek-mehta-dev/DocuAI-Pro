"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAuth } from "@/hooks/useAuth";

function AuthInitializer() {
  useAuth();
  return null;
}

export default function AuthProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}
