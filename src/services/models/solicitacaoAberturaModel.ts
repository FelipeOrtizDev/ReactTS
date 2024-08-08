export interface SolicitacaoAbertura {
  id_SolicitacaoAbertura: number;
  SB_DataAbertura: string;
  SB_SolicitacaoBase_id_SolicitacaoBase: number;
  SB_SolicitacaoBase_SB_Enderecos_id_Endereco: number;
  SB_HAbertura: number;
  SB_HNMotivo: string;
  SB_HNObservacoes: string;
  SB_HSData: string;
  SB_HoraAbertura: string;
  SB_Solicitante: string;
  SB_ServicoAceito: number;
}
