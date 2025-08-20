import useSWRMutation from "swr/mutation";
import { createPayment, verifyPayment } from "@/services/paymentService";

export const useCreatePayment = (payload) => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    "create-payment",
    async (_, { arg: payload }) => {
      return await createPayment(payload);
    }
  );

  return {
    data,
    isError: Boolean(error),
    isLoading: isMutating,
    error,
    trigger,
  };
};

export const useVerifyPayment = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    "verify-payment",
    async (_, { arg }) => verifyPayment(arg)
  );
  return { data, isError: !!error, isLoading: isMutating, error, trigger };
};
