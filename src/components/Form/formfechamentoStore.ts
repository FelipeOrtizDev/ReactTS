/* import { create } from "zustand";
import { Acatamento } from "../../services/models/acatamentoModel";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Fechamento } from "../../services/models/fechamentoModel";
import axios from "axios";

interface StoreState {
  solicitacaoBase: SolicitacaoBase | null;
  fechamento: Fechamento | null;
  acatamento: Acatamento | null;
  solitacaoAbertura: SolicitacaoAbertura;
  acatamentoAbertura: AcatamentosAbertura;
  setSolicitacaoBase: (solicitacaoBase: SolicitacaoBase) => void;
  setFechamento: (fechamento: Fechamento) => void;
  setAcatamento: (acatamento: Acatamento) => void;
  setSolicitacaoAbertura: (solitacaoAbertura: SolicitacaoAbertura) => void;
  setAcatamentoAbertura: (acatamentoAbertura: AcatamentosAbertura) => void;
  loadFormData: (id: number) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  solicitacaoBase: null,
  fechamento: null,
  acatamento: null,
  solitacaoAbertura: {} as SolicitacaoAbertura,
  acatamentoAbertura: {} as AcatamentosAbertura,
  setSolicitacaoBase: (solicitacaoBase) => set({ solicitacaoBase }),
  setFechamento: (fechamento) => set({ fechamento }),
  setAcatamento: (acatamento) => set({ acatamento }),
  setSolicitacaoAbertura: (solitacaoAbertura) => set({ solitacaoAbertura }),
  setAcatamentoAbertura: (acatamentoAbertura) => set({ acatamentoAbertura }),
  loadFormData: async (id) => {
    try {
      const [fechamento, acatamento] = await Promise.all([
        fetchFechamento(id),
        fetchAcatamento(id),
      ]);
      set({
        fechamento,
        acatamento,
      });
    } catch (error) {
      console.error("Erro ao carregar os dados do formulário:", error);
    }
  },
}));

 */

import { create } from "zustand";

import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Fechamento } from "../../services/models/fechamentoModel";
import { Acatamento } from "../../services/models/acatamentoModel";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";
import { getFechamentos } from "../../services/api/fechamentoService";
import { getAcatamentos } from "../../services/api/Acatamento/acatamentoService";

interface FormDataState {
  solicitacaoBase: SolicitacaoBase | null;
  fechamento: Fechamento;
  acatamento: Acatamento;
  solicitacaoAbertura: SolicitacaoAbertura | null;
  acatamentoAbertura: AcatamentosAbertura | null;
  loadFormData: (id: number) => void;
  setSolicitacaoBase: (data: SolicitacaoBase) => void;
  setFechamento: (data: Fechamento) => void;
  setAcatamento: (data: Acatamento) => void;
  setSolicitacaoAbertura: (data: SolicitacaoAbertura) => void;
  setAcatamentoAbertura: (data: AcatamentosAbertura) => void;
}

export const useStore = create<FormDataState>((set) => ({
  solicitacaoBase: null,
  fechamento: {} as Fechamento,
  acatamento: {} as Acatamento,
  solicitacaoAbertura: null,
  acatamentoAbertura: null,
  loadFormData: async (id) => {
    const fechamento = await getFechamentos(id);
    const acatamento = await getAcatamentos(id);
    set({
      fechamento,
      acatamento,
    });
  },
  setSolicitacaoBase: (data) => set({ solicitacaoBase: data }),
  setFechamento: (data) => set({ fechamento: data }),
  setAcatamento: (data) => set({ acatamento: data }),
  setSolicitacaoAbertura: (data) => set({ solicitacaoAbertura: data }),
  setAcatamentoAbertura: (data) => set({ acatamentoAbertura: data }),
}));
