import { Fechamento } from "../models/fechamentoModel";
import { axiosInstance } from "./conexaoApi";

export const getFechamentos = async (id: number,): Promise<Fechamento[]> => {
  try {
    const response = await axiosInstance.get(`/fechamentos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao puxar todos os fechamentos" + error);
  }
};

export const createFechamentos = async (
  fechamento: Fechamento
): Promise<Fechamento> => {
  try {
    const response = await axiosInstance.post(
      `/fechamentos/${fechamento.Sb_SolicitacaoBase.id_SolicitacaoBase}`,
      fechamento
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar fechamento: " + error);
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
