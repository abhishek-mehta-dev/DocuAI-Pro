import apiClient from "@/lib/apiClient";

export const register = async (formData) => {
  const response = await apiClient.post("/auth/register", formData);
  return response.data;
};

export const login = async (formData) => {
  const response = await apiClient.post("/auth/login", formData);
  return response.data;
};

export const googleLogin = async (token) => {
  const res = await apiClient.post("/auth/google-login", { credential: token });
  return res.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const profile = async () => {
  const response = await apiClient.get("/auth/profile");
  return response.data;
};
