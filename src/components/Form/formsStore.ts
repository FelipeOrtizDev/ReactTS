import { create } from "zustand";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Fechamento } from "../../services/models/fechamentoModel";
import { Acatamento } from "../../services/models/acatamentoModel";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";

interface FormDataState {
  solicitacaoBase: SolicitacaoBase;
  fechamento: Fechamento;
  acatamento: Acatamento;
  acatamentoAbertura: AcatamentosAbertura;
  solicitacaoAbertura: SolicitacaoAbertura;
  setSolicitacaoBase: (data: SolicitacaoBase) => void;
  setFechamento: (data: Fechamento) => void;
  setAcatamento: (data: Acatamento) => void;
  setAcatamentoAbertura: (data: AcatamentosAbertura) => void;
  setSolicitacaoAbertura: (data: SolicitacaoAbertura) => void;
}

export const useStore = create<FormDataState>((set) => ({
  solicitacaoBase: {} as SolicitacaoBase,
  fechamento: {} as Fechamento,
  acatamento: {} as Acatamento,
  solicitacaoAbertura: {} as SolicitacaoAbertura,
  acatamentoAbertura: {} as AcatamentosAbertura,
  setSolicitacaoBase: (data) => set({ solicitacaoBase: data }),
  setFechamento: (data) => set({ fechamento: data }),
  setAcatamento: (data) => set({ acatamento: data }),
  setAcatamentoAbertura: (data) => set({ acatamentoAbertura: data }),
  setSolicitacaoAbertura: (data) => set({ solicitacaoAbertura: data }),
}));
