import { Fechamento } from "../models/fechamentoModel";
import { axiosInstance } from "./conexaoApi";

export const getFechamentos = async (): Promise<Fechamento[]> => {
  try {
    const response = await axiosInstance.get("/fechamentos/:solicitacaoId");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao puxar todos os fechamentos" + error);
  }
};

export const createFechamentos = async (
  fechamento: Fechamento
): Promise<Fechamento> => {
  try {
    const response = await axiosInstance.post("/fechamentos", fechamento);
    return response.data;
  } catch (error) {
    throw new Error("Error ao criar fehcmaneto" + error);
  }
};

export const updateFechamento = async (
  id: number,
  fechamento: Partial<Fechamento>
): Promise<Fechamento> => {
  try {
    const response = await axiosInstance.put(`/fechamentos/${id}`, fechamento);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar fechamento" + error);
  }
};

export const deleteFechamento = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/fechamentos/${id}`);
  } catch (error) {
    throw new Error("Erro ao deletar o fechamento" + error);
  }
};
