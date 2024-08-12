import { SolicitacaoBase } from "./solicitacaoBaseModel";

export interface Acatamento {
  id_Acatamentos: number;
  SB_DataAcatamento: string;
  SB_PrevisaoAcatamento: string;
  SB_EquipeResponsavel: string;
  SB_ObservacaoAcatamento: string;
  SB_SolicitacaoBase_id_SolicitacaoBase: number;
  SB_SolicitacaoBase_id_Endereco: number;
  SB_SolcitacaoBase: SolicitacaoBase;
}
