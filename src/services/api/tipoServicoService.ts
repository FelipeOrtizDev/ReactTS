import { axiosInstance } from "./conexaoApi";

export const getTipoServicos = async () => {
  const response = await axiosInstance.get("/tipoServico");
  return response.data;
};
