import { axiosInstance } from "./conexaoApi";

export const getZonaPressao = async () => {
  const response = await axiosInstance.get("/zonaPressao");
  return response.data;
};
