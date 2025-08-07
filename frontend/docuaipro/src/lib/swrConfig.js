"use client";

import { SWRConfig } from "swr";
import apiClient from "@/lib/apiClient";

export default function SWRProvider({ children }) {
  const swrGlobalConfig = {
    fetcher: (url) => apiClient.get(url).then((res) => res.data),
    dedupingInterval: 60 * 1000,
    errorRetryCount: 1,
    onError: (err) => {
      console.log("global error", err);
    },
  };

  return <SWRConfig value={swrGlobalConfig}>{children}</SWRConfig>;
}
