"use client";
import { useProfile } from "@/hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  clearUser,
  setLoading,
  setError,
} from "@/context/store/authSlice";
import { useEffect, useCallback } from "react";

export const useAuth = () => {
  const { user, isError, isLoading, mutate } = useProfile();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // Handle authentication state changes
  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (user?.data) {
      // SWR returns data in a wrapper, extract the actual user data
      dispatch(setUser(user.data));
    } else if (isError) {
      dispatch(setError());
    }
  }, [user, isError, isLoading, dispatch]);

  // Method to refresh user data
  const refreshUser = useCallback(() => {
    mutate();
  }, [mutate]);

  // Method to check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return Boolean(authState.user && !authState.isError);
  }, [authState.user, authState.isError]);

  // Method to get user role/type
  const getUserRole = useCallback(() => {
    return authState.user?.user_type || null;
  }, [authState.user?.user_type]);

  return {
    ...authState,
    isAuthenticated: isAuthenticated(),
    userRole: getUserRole(),
    refreshUser,
  };
};
