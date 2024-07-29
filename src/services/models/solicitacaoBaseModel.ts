import { Endereco } from "./enderecoModel";

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