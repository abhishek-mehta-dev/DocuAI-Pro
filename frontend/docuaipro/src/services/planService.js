import apiClient from "@/lib/apiClient";

export const getPlans = async () => {
  const response = await apiClient.get("/plan/");
  return response.data;
};
