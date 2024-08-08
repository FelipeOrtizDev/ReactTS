import { create } from "zustand";
import { Endereco } from "../../services/models/enderecoModel";

interface SolicitacaoBase {
  id_SolicitacaoBase: number;
  SB_DataSolicitacao: string;
  SB_HoraSolicitacao: string;
  SB_Status: string;
  SB_TipoServico: string;
  SB_Endereco: Endereco;
  SB_NumeroOS: string;
  SB_Microzona: string;
  SB_Solicitante: string;
  SB_Responsavel: string;
  SB_NumeroMZ: string;
  SB_Motivo: string;
  SB_Prioridade: string;
  SB_Observacoes: string;
}
interface Fechamento {
  SB_DataFechamento: string;
  SB_HoraFechamento: string;
  SB_Status: string;
  SB_Prioridade: string;
  SB_ServicoAceito: number;
  SB_HouveFechamento: boolean;
  SB_Rede: string;
  SB_UltilizouMZ: string;
  SB_FechadoPor: string;
  SB_HFSMotivo: string;
  SB_QTDELigacoes: number;
  SB_HSNObservacao: string;
  SB_HSNMotivo: string;
  SB_ManobraWFM: string;
  SB_Previsao: string;
  SB_HFSObservacaoFechamento: string;
  SB_Executante: string;
  SB_OFechado: string;
  SB_SolicitacaoBase_id_SolicitacaoBase: number;
}

interface StoreState {
  solicitacaoBase: SolicitacaoBase | null;
  fechamento: Fechamento;
  setSolicitacaoBase: (solicitacaoBase: SolicitacaoBase) => void;
  setFechamento: (fechamento: Fechamento) => void;
}

export const useStore = create<StoreState>((set) => ({
  solicitacaoBase: null,
  fechamento: {} as Fechamento,
  setSolicitacaoBase: (solicitacaoBase) => set({ solicitacaoBase }),
  setFechamento: (fechamento) => set({ fechamento }),
}));
