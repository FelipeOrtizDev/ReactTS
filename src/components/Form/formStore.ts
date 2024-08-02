import {create} from "zustand";
import { Acatamento } from "../../services/models/acatamentoModel";
import { Fechamento } from "../../services/models/fechamentoModel";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";

interface FormAcatamentoState {
  acatamento: Partial<Acatamento>;
  setAcatamento: (data: Partial<Acatamento>) => void;
}

export const useFormAcatamentoStore = create<FormAcatamentoState>((set) => ({
  acatamento: {},
  setAcatamento: (data) =>
    set((state) => ({ acatamento: { ...state.acatamento, ...data } })),
}));

interface FormFechamentoState {
  fechamento: Partial<Fechamento>;
  setFechamento: (data: Partial<Fechamento>) => void;
}

export const useFormFechamentoStore = create<FormFechamentoState>((set) => ({
  fechamento: {},
  setFechamento: (data) =>
    set((state) => ({ fechamento: { ...state.fechamento, ...data } })),
}));

interface FormServicoAberturaState {
  solicitacaoAbertura: Partial<SolicitacaoAbertura>;
  setSolicitacaoAbertura: (data: Partial<SolicitacaoAbertura>) => void;
}

interface FormServicoAberturaState {
  solicitacaoAbertura: Partial<SolicitacaoAbertura>;
  setSolicitacaoAbertura: (data: Partial<SolicitacaoAbertura>) => void;
}

export const useFormServicoAberturaStore = create<FormServicoAberturaState>(
  (set) => ({
    solicitacaoAbertura: {},
    setSolicitacaoAbertura: (data) =>
      set((state) => ({
        solicitacaoAbertura: { ...state.solicitacaoAbertura, ...data },
      })),
  })
);

interface FormAcatamentoAberturaState {
  acatamentoAbertura: Partial<AcatamentosAbertura>;
  setAcatamentoAbertura: (data: Partial<AcatamentosAbertura>) => void;
}

export const useFormAcatamentoAberturaStore =
  create<FormAcatamentoAberturaState>((set) => ({
    acatamentoAbertura: {},
    setAcatamentoAbertura: (data) =>
      set((state) => ({
        acatamentoAbertura: { ...state.acatamentoAbertura, ...data },
      })),
  }));
