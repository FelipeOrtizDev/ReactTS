// src/store/solicitacaoBaseStore.ts
import create from "zustand";
import { SolicitacaoBase } from "../services/models/solicitacaoBaseModel";
import {
  getSolicitacoesBase,
  createSolicitacaoBase,
  updateSolicitacaoBase,
  deleteSolicitacaoBase,
} from "../services/api/solicitacaoBaseService";

interface SolicitacaoBaseState {
  solicitacoesBase: SolicitacaoBase[];
  fetchSolicitacoesBase: () => Promise<void>;
  createSolicitacaoBase: (solicitacaoBase: SolicitacaoBase) => Promise<void>;
  updateSolicitacaoBase: (
    id: number,
    solicitacaoBase: Partial<SolicitacaoBase>
  ) => Promise<void>;
  deleteSolicitacaoBase: (id: number) => Promise<void>;
  setSolicitacaoBase: (data: Partial<SolicitacaoBase>) => void;
}

export const useSolicitacaoBaseStore = create<SolicitacaoBaseState>((set) => ({
  solicitacoesBase: [],
  fetchSolicitacoesBase: async () => {
    const solicitacoesBase = await getSolicitacoesBase();
    set({ solicitacoesBase });
  },
  createSolicitacaoBase: async (solicitacaoBase: SolicitacaoBase) => {
    const createdSolicitacaoBase = await createSolicitacaoBase(solicitacaoBase);
    set((state) => ({
      solicitacoesBase: [...state.solicitacoesBase, createdSolicitacaoBase],
    }));
  },
  updateSolicitacaoBase: async (
    id: number,
    solicitacaoBase: Partial<SolicitacaoBase>
  ) => {
    const updatedSolicitacaoBase = await updateSolicitacaoBase(
      id,
      solicitacaoBase
    );
    set((state) => ({
      solicitacoesBase: state.solicitacoesBase.map((sol) =>
        sol.id_SolicitacaoBase === id ? updatedSolicitacaoBase : sol
      ),
    }));
  },
  deleteSolicitacaoBase: async (id: number) => {
    await deleteSolicitacaoBase(id);
    set((state) => ({
      solicitacoesBase: state.solicitacoesBase.filter(
        (sol) => sol.id_SolicitacaoBase !== id
      ),
    }));
  },
  setSolicitacaoBase: (data: Partial<SolicitacaoBase>) =>
    set((state) => ({
      solicitacoesBase: state.solicitacoesBase.map((sol) =>
        sol.id_SolicitacaoBase === data.id_SolicitacaoBase
          ? { ...sol, ...data }
          : sol
      ),
    })),
}));
