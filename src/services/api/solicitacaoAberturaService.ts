import { SolicitacaoAbertura } from "../models/solicitacaoAberturaModel";
import { axiosInstance } from "./conexaoApi";

// Interface para SolicitacaoAbertura


// Funções de serviço para SolicitacaoAbertura
export const getSolicitacoesAbertura = async (): Promise<
  SolicitacaoAbertura[]
> => {
  try {
    const response = await axiosInstance.get("/solicitacoes-abertura");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar solicitações de abertura: " + error);
  }
};

export const createSolicitacaoAbertura = async (
  solicitacaoAbertura: SolicitacaoAbertura
): Promise<SolicitacaoAbertura> => {
  try {
    const response = await axiosInstance.post(
      "/solicitacoes-abertura",
      solicitacaoAbertura
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar solicitação de abertura: " + error);
  }
};

export const updateSolicitacaoAbertura = async (
  id: number,
  solicitacaoAbertura: Partial<SolicitacaoAbertura>
): Promise<SolicitacaoAbertura> => {
  try {
    const response = await axiosInstance.put(
      `/solicitacoes-abertura/${id}`,
      solicitacaoAbertura
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar solicitação de abertura: " + error);
  }
};

export const deleteSolicitacaoAbertura = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/solicitacoes-abertura/${id}`);
  } catch (error) {
    throw new Error("Erro ao deletar solicitação de abertura: " + error);
  }
};
