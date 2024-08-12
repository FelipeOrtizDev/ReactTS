export interface AcatamentosAbertura {
  id_AcatamentosAbertura: number;
  SB_DataAcatamentoAbertura: string; // DATE no banco de dados, representado como string
  SB_PrevisaoAcatamentoAbertura: string; // TIME no banco de dados, representado como string
  SB_EquipeResponsavelAbertura: string; // VARCHAR(75)
  SB_SolicitacaoBase_id_SolicitacaoBase: number; // INT, referenciando SB_SolicitacaoBase
  SB_SolicitacaoBase_id_Endereco: number; // INT, referenciando SB_SolicitacaoBase
  SB_ObservacaoAcatamentoAbertura: string; // VARCHAR(250)
}
