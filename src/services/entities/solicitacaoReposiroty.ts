import { getFechamentos, createFechamentos } from "./../api/fechamentoService";
import { getSolicitacoesBase } from "./../api/solicitacaoBase";

import { SolicitacaoBase } from "../models/solicitacaoBaseModel";
import { Fechamento } from "../models/fechamentoModel";

export interface SolicitacaoRepository {
  getSolicitacoesBase(): Promise<SolicitacaoBase[]>;
  getFechamentos(solicitacaoId: number): Promise<Fechamento | null>;
  createFechamentos(fechamento: Fechamento): Promise<void>;
}
