// src/store/acatamentoStore.ts
import create from "zustand";
import {
  getAcatamentos,
  createAcatamento,
  updateAcatamento,
  deleteAcatamento,
} from "../../../services/api/Acatamento/acatamentoService";
import { Acatamento } from "../../../services/models/acatamentoModel";

interface AcatamentoState {
  acatamentos: Record<number, Acatamento>;
  fetchAcatamentos: (solicitacaoId: number) => Promise<void>;
  createAcatamento: (acatamento: Acatamento) => Promise<void>;
  updateAcatamento: (
    id: number,
    acatamento: Partial<Acatamento>
  ) => Promise<void>;
  deleteAcatamento: (id: number) => Promise<void>;
  setAcatamento: (solicitacaoId: number, data: Partial<Acatamento>) => void;
}

export const useAcatamentoStore = create<AcatamentoState>((set) => ({
  acatamentos: {},
  fetchAcatamentos: async (solicitacaoId: number) => {
    const acatamentos = await getAcatamentos(solicitacaoId);
    set((state) => ({
      acatamentos: { ...state.acatamentos, [solicitacaoId]: acatamentos },
    }));
  },
  createAcatamento: async (acatamento: Acatamento) => {
    const createdAcatamento = await createAcatamento(acatamento);
    set((state) => ({
      acatamentos: {
        ...state.acatamentos,
        [createdAcatamento.SB_SolicitacaoBase_id_SolicitacaoBase]:
          createdAcatamento,
      },
    }));
  },
  updateAcatamento: async (id: number, acatamento: Partial<Acatamento>) => {
    const updatedAcatamento = await updateAcatamento(id, acatamento);
    set((state) => ({
      acatamentos: {
        ...state.acatamentos,
        [updatedAcatamento.SB_SolicitacaoBase_id_SolicitacaoBase]:
          updatedAcatamento,
      },
    }));
  },
  deleteAcatamento: async (id: number) => {
    await deleteAcatamento(id);
    set((state) => {
      const updatedAcatamentos = { ...state.acatamentos };
      delete updatedAcatamentos[id];
      return { acatamentos: updatedAcatamentos };
    });
  },
  setAcatamento: (solicitacaoId: number, data: Partial<Acatamento>) =>
    set((state) => ({
      acatamentos: {
        ...state.acatamentos,
        [solicitacaoId]: { ...state.acatamentos[solicitacaoId], ...data },
      },
    })),
}));
