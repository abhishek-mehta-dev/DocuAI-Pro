"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  showFooter,
  hideFooter,
  toggleFooter,
} from "@/context/store/footerSlice";

export function useFooterVisibility() {
  const isFooterVisible = useSelector((state) => state.footer.isVisible);
  const dispatch = useDispatch();

  return {
    isFooterVisible,
    showFooter: () => dispatch(showFooter()),
    hideFooter: () => dispatch(hideFooter()),
    toggleFooter: () => dispatch(toggleFooter()),
  };
}
