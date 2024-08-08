import { SolicitacaoBase } from "../models/solicitacaoBaseModel";
import { SolicitacaoRepository } from "./../entities/solicitacaoReposiroty";
export class FetchSolcitacao {
  constructor(private solicitacaoRepository: SolicitacaoRepository) {}

  async execute(): Promise<SolicitacaoBase[]> {
    return await this.solicitacaoRepository.getSolicitacoesBase();
  }
}
