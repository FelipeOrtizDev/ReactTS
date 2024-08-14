export interface SolicitacaoAbertura {
  id_SolicitacaoAbertura: number;
  SB_DataAbertura: string; // DATE no banco de dados, pode ser string no formato de data
  SB_HAbertura: string; // TIME no banco de dados, pode ser string representando o horário
  SB_HoraAbertura: string; // TIME no banco de dados
  SB_HNMotivo: string; // VARCHAR(100)
  SB_HNObservacoes: string; // VARCHAR(250)
  SB_Rede: string; // VARCHAR(45)
  SB_UtilizouMZ: string; // VARCHAR(45)
  SB_AbertoPor: string; // VARCHAR(45)
  SB_HSData: string; // DATE no banco de dados
  SB_Solicitante: string; // VARCHAR(45)
  SB_ServicoAceito: number; // TINYINT, representado como number
  SB_Previsao: string; // TIME no banco de dados
  SB_ManobraWFM: string; // VARCHAR(100)
  SB_Executante: string; // VARCHAR(100)
  SB_HFSObservacaoAbertura: string; // VARCHAR(250)
  SB_QTDEligacoes: string; // VARCHAR(45)
  SB_HSNMotivo: string;
  SB_OAberto: string; // VARCHAR(45)
  SB_SolicitacaoBase_id_SolicitacaoBase: number; // INT
  SB_SolicitacaoBase_id_Endereco: number; // INT
}
