import apiClient from "@/lib/apiClient";

export const createPayment = async (payload) => {
  const response = await apiClient.post("/payment/create", payload);
  return response.data.data;
};

export const verifyPayment = async (orderId) => {
  const response = await apiClient.post(`/payment/verify/${orderId}`);
  return response.data.data;
};
