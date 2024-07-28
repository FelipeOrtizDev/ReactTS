import { axiosInstance } from "./conexaoApi";
import { SolicitacaoBase } from "./solicitacaoBase";

export interface Fechamento extends SolicitacaoBase {
  id_Fechamentos?: number;
  SB_DataFechamento: string;
  SB_HoraFechamento: string;
  SB_Status: string;
  SB_Prioridade: string;
  SB_ServicoAceito: number;
  SB_HouveFechamento: number;
  SB_Rede: string;
  SB_UltilizouMZ: string;
  SB_QTDELigacoes: number;
  SB_FechadoPor: string;
  SB_HFSMotivo: string;
  SB_HSNObservacao: string;
  SB_HSNMotivo: string;
  SB_ManobraWFM: string;
  SB_Executante: string;
  SB_Previsão: string;
  SB_HFSObservacaoFechamento: string;
  SB_OFechado: string;
  SB_SolicitacaoBase_id_SolicitacaoBase: number;
  SB_SolicitacaoBase_SB_Enderecos_id_Endereco: number;
}

export const getFechamentos = async (): Promise<Fechamento[]> => {
  try {
    const response = await axiosInstance.get("/fechamentos");
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
