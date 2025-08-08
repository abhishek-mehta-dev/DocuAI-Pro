import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useProfile } from "./useUser"; // your existing SWR hook to /auth/profile
import {
  setUser,
  clearUser,
  setLoading,
  setError,
} from "@/context/store/authSlice";

export const useAuth = () => {
  const { user, isLoading, isError } = useProfile();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (user) dispatch(setUser(user.data));
    else if (isError) dispatch(setError());
  }, [user, isLoading, isError, dispatch]);

  const isAuthenticated = Boolean(authState.user && !authState.isError);

  return {
    ...authState,
    isAuthenticated,
    userRole: authState.user?.user_type || null,
  };
};
