import { getPlans } from "@/services/planService";
import useSWR from "swr";

export const usePlans = () => {
  const { data, error, isLoading } = useSWR("plans", getPlans, {
    onError: (err) => {
      if (err.response?.status === 401) {
        console.error("Unauthorised");
      }
    },
  });
  return {
    plan: data,
    isError: Boolean(error),
    isLoading,
    error,
  };
};
