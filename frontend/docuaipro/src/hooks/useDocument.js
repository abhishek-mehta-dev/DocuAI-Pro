import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  uploadPdfAndExtractData,
  listDocument,
  chatWithPdf,
} from "@/services/documentService";

export const useUploadPdf = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    "upload-pdf",
    async (_, { arg: file }) => {
      return await uploadPdfAndExtractData(file);
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

export const useListDocument = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "list-document",
    listDocument
  );

  return {
    data,
    isError: Boolean(error),
    isLoading,
    error,
    mutate,
  };
};

export const useChatWithPdf = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    "chat-pdf",
    async (key, { arg }) => {
      return await chatWithPdf(arg);
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
