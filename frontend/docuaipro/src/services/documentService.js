import apiClient from "@/lib/apiClient";

export const uploadPdfAndExtractData = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/document/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const listDocument = async () => {
  const response = await apiClient.get("/document/list");
  return response.data;
};

export const chatWithPdf = async () => {
  const response = await apiClient.post("/document/chat");
  return response.data;
};
