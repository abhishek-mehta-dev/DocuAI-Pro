import useSWRMutation from "swr/mutation";
import {
  login,
  logout,
  profile,
  register,
  googleLogin,
} from "@/services/userService";
import useSWR from "swr";
import { mutate } from "swr";
export const useRegister = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "register-user",
    async (key, { arg }) => register(arg)
  );

  const registerUser = async (userData) => {
    try {
      const result = await trigger(userData);
      return { success: true, data: result };
    } catch (err) {
      console.error("Registration error:", err);
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    }
  };

  return {
    registerUser,
    user: data,
    isLoading: isMutating,
    isError: Boolean(error),
    error,
  };
};

export const useLogin = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "login-user",
    async (key, { arg }) => login(arg)
  );

  const loginUser = async (credentials) => {
    try {
      const result = await trigger(credentials);
      // Refresh profile data after successful login
      mutate("user-profile");
      return { success: true, data: result };
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  return {
    loginUser,
    user: data,
    isLoading: isMutating,
    isError: Boolean(error),
    error,
  };
};

export const useGoogleLoginMutation = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "login-google",
    async (key, { arg: token }) => await googleLogin(token)
  );

  const loginWithGoogle = async (token) => {
    try {
      const result = await trigger(token);
      mutate("user-profile");
      return { success: true, data: result };
    } catch (err) {
      console.error("Google login error", err);
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  return {
    loginWithGoogle,
    isLoading: isMutating,
    isError: Boolean(error),
    error,
  };
};

export const useLogout = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "logout-user",
    async () => logout()
  );

  const logoutUser = async () => {
    try {
      const result = await trigger();

      // Clear cached user profile
      mutate("user-profile", null, false);

      // Revalidate the user profile to reflect unauthenticated state
      mutate("user-profile");

      return { success: true, data: result };
    } catch (err) {
      console.error("Logout error:", err);

      // Clear and revalidate anyway (force user to be logged out in UI)
      mutate("user-profile", null, false);
      mutate("user-profile");

      return {
        success: false,
        error: err.response?.data?.message || "Logout failed",
      };
    }
  };

  return {
    logoutUser,
    result: data,
    isLoading: isMutating,
    isError: Boolean(error),
    error,
  };
};

export const useProfile = () => {
  const { data, error, isLoading, mutate } = useSWR("user-profile", profile, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    // Don't retry on 401 errors (unauthorized)
    onError: (err) => {
      if (err.response?.status === 401) {
        // Clear any stale auth state on 401
        console.log("Unauthorized access - clearing auth state");
      }
    },
  });

  return {
    user: data,
    isError: Boolean(error),
    isLoading,
    error,
    mutate,
  };
};
