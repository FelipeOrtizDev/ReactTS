import { SolicitacaoBase } from "../models/solicitacaoBaseModel";
import { axiosInstance } from "./conexaoApi";

export const getSolicitacoesBase = async (): Promise<SolicitacaoBase[]> => {
  try {
    const response = await axiosInstance.get("/solicitacoes");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar solicitações base: " + error);
  }
};

export const createSolicitacaoBase = async (
  solicitacaoBase: SolicitacaoBase
): Promise<SolicitacaoBase> => {
  try {
    const response = await axiosInstance.post("/solicitacoes", solicitacaoBase);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar solicitação base: " + error);
  }
};

export const updateSolicitacaoBase = async (
  id: number,
  solicitacaoBase: Partial<SolicitacaoBase>
): Promise<SolicitacaoBase> => {
  try {
    const response = await axiosInstance.put(
      `/solicitacoes/${id}`,
      solicitacaoBase
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar solicitação base: " + error);
  }
};

export const deleteSolicitacaoBase = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/solicitacoes/${id}`);
  } catch (error) {
    throw new Error("Erro ao deletar solicitação base: " + error);
  }
};
