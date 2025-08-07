// components/ToastListener.jsx
"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { clearMessage } from "@/context/store/messageSlice";

export default function ToastListener() {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.message);

  useEffect(() => {
    if (message) {
      toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear after showing
      dispatch(clearMessage());
    }
  }, [message, type, dispatch]);

  return <ToastContainer />;
}
