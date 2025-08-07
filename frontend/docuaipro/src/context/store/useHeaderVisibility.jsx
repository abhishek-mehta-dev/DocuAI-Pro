"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  showHeader,
  hideHeader,
  toggleHeader,
} from "@/context/store/headerSlice";

export function useHeaderVisibility() {
  const isHeaderVisible = useSelector((state) => state.header.isVisible);
  const dispatch = useDispatch();

  return {
    isHeaderVisible,
    showHeader: () => dispatch(showHeader()),
    hideHeader: () => dispatch(hideHeader()),
    toggleHeader: () => dispatch(toggleHeader()),
  };
}
