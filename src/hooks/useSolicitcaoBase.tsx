/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  getSolicitacoesBase,
  createSolicitacaoBase,
  updateSolicitacaoBase,
  deleteSolicitacaoBase,
  SolicitacaoBase,
} from "../services/api/solicitacaoBase";

export const useSolicitacaoBase = () => {
  const [solicitacoesBase, setSolicitacoesBase] = useState<SolicitacaoBase[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSolicitacoesBase = async () => {
      try {
        const data = await getSolicitacoesBase();
        setSolicitacoesBase(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchSolicitacoesBase();
  }, []);

  const addSolicitacaoBase = async (solicitacaoBase: SolicitacaoBase) => {
    try {
      const newSolicitacaoBase = await createSolicitacaoBase(solicitacaoBase);
      setSolicitacoesBase([...solicitacoesBase, newSolicitacaoBase]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const editSolicitacaoBase = async (
    id: number,
    solicitacaoBase: Partial<SolicitacaoBase>
  ) => {
    try {
      const updatedSolicitacaoBase = await updateSolicitacaoBase(
        id,
        solicitacaoBase
      );
      setSolicitacoesBase(
        solicitacoesBase.map((s) =>
          s.id_SolicitacaoBase === id ? updatedSolicitacaoBase : s
        )
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const removeSolicitacaoBase = async (id: number) => {
    try {
      await deleteSolicitacaoBase(id);
      setSolicitacoesBase(
        solicitacoesBase.filter((s) => s.id_SolicitacaoBase !== id)
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    solicitacoesBase,
    error,
    addSolicitacaoBase,
    editSolicitacaoBase,
    removeSolicitacaoBase,
  };
};
