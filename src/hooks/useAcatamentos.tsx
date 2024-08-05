/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  getAcatamentos,
  createAcatamento,
  updateAcatamento,
  deleteAcatamento,
} from "../services/api/acatamentoService";
import { Acatamento } from "../services/models/acatamentoModel";

export const useAcatamentos = () => {
  const [acatamentos, setAcatamentos] = useState<Acatamento[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcatamentos = async () => {
      try {
        const data = await getAcatamentos();
        setAcatamentos(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchAcatamentos();
  }, []);

  const addAcatamento = async (acatamento: Acatamento) => {
    try {
      const newAcatamento = await createAcatamento(acatamento);
      setAcatamentos([...acatamentos, newAcatamento]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const editAcatamento = async (
    id: number,
    acatamento: Partial<Acatamento>
  ) => {
    try {
      const updatedAcatamento = await updateAcatamento(id, acatamento);
      setAcatamentos(
        acatamentos.map((a) =>
          a.id_Acatamentos === id ? updatedAcatamento : a
        )
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const removeAcatamento = async (id: number) => {
    try {
      await deleteAcatamento(id);
      setAcatamentos(acatamentos.filter((a) => a.id_Acatamentos !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    acatamentos,
    error,
    addAcatamento,
    editAcatamento,
    removeAcatamento,
  };
};
