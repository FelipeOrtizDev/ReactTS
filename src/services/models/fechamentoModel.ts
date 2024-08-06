export interface Fechamento {
  id_Fechamentos: number;
  SB_DataFechamento: string;
  SB_HoraFechamento: string;
  SB_Status: string;
  SB_Prioridade: string;
  SB_ServicoAceito: boolean;
  SB_HouveFechamento: boolean;
  SB_Rede: string;
  SB_UltilizouMZ: string;
  SB_QTDELigacoes: number;
  SB_FechadoPor: string;
  SB_HFSMotivo: string;
  SB_HSNMotivo: string;
  SB_HSNObservacao: string;
  SB_Previsao: string;
  SB_HFSObservacaoFechamento: string;
  SB_Executante: string;
  SB_ManobraWFM: string;
  SB_OFechado: string;
  SB_SolicitacaoBase_id_SolicitacaoBase: number;
}
