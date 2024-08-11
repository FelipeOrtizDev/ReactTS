import { create } from "zustand";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Fechamento } from "../../services/models/fechamentoModel";

interface FormDataState {
  solicitacaoBase: SolicitacaoBase;
  fechamento: Fechamento;
  setSolicitacaoBase: (data: SolicitacaoBase) => void;
  setFechamento: (data: Fechamento) => void;
}

export const useStore = create<FormDataState>((set) => ({
  solicitacaoBase: {} as SolicitacaoBase,
  fechamento: {} as Fechamento,
  setSolicitacaoBase: (data) => set({ solicitacaoBase: data }),
  setFechamento: (data) => set({ fechamento: data }),
}));
