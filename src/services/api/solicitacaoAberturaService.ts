import { SolicitacaoAbertura } from "../models/solicitacaoAberturaModel";
import { axiosInstance } from "./conexaoApi";

// Funções de serviço para SolicitacaoAbertura
export const getSolicitacoesAbertura = async (
  solicitacaoBaseId: number
): Promise<SolicitacaoAbertura> => {
  try {
    const response = await axiosInstance.get<SolicitacaoAbertura>(
      `/solicitacaoAbertura/${solicitacaoBaseId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar solicitações de abertura: " + error);
  }
};

export const createSolicitacaoAbertura = async (
  solicitacaoBaseId: number,
  solicitacaoAbertura: SolicitacaoAbertura
): Promise<SolicitacaoAbertura> => {
  try {
    const response = await axiosInstance.post<SolicitacaoAbertura>(
      `/solicitacaoAbertura/${solicitacaoBaseId}`,
      solicitacaoAbertura
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar solicitação de abertura: " + error);
  }
};

export const updateSolicitacaoAbertura = async (
  solicitacaoAbertura: SolicitacaoAbertura
): Promise<SolicitacaoAbertura> => {
  try {
    const response = await axiosInstance.put(
      `/solicitacaoAbertura/${solicitacaoAbertura.id_SolicitacaoAbertura}`,
      solicitacaoAbertura
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar solicitação de abertura: " + error);
  }
};

export const deleteSolicitacaoAbertura = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/solicitacaoAbertura/${id}`);
  } catch (error) {
    throw new Error("Erro ao deletar solicitação de abertura: " + error);
  }
};

// Função para salvar ou atualizar um fechamento
// Essa função deve usar o solicitacaoBaseId ao criar ou atualizar o fechamento
export const saveOrUpdateSolicitacaoAbertura = async (
  solicitacaoBaseId: number,
  solicitacaoAberturaData: SolicitacaoAbertura
): Promise<SolicitacaoAbertura> => {
  if (solicitacaoAberturaData.id_SolicitacaoAbertura) {
      return await updateSolicitacaoAbertura(solicitacaoAberturaData)
  } else {
    // Caso contrário, crie um novo fechamento
    return await createSolicitacaoAbertura(
      solicitacaoBaseId,
      solicitacaoAberturaData
    );
  }
};
