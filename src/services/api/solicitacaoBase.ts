import { axiosInstance } from "./conexaoApi";
import { Endereco } from "./enderecoService";

export interface SolicitacaoBase {
  id_SolicitacaoBase: number;
  SB_DataSolicitacao: string;
  SB_HoraSolicitacao: string;
  SB_NumeroOS: string;
  SB_TipoServico: string;
  SB_Observacoes: string;
  SB_Microzona: number;
  SB_Solicitante: string;
  SB_NumeroMZ: number;
  SB_Prioridade: string;
  SB_Motivo: number;
  SB_Status: string;
  SB_Responsavel: string;
  SB_Enderecos_id_Endereco: number;
  SB_Endereco: Endereco;
}

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
