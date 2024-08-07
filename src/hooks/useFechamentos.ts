/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  getFechamentos,
  createFechamentos,
  updateFechamento,
  deleteFechamento,
} from "../services/api/fechamentoService";
import { Fechamento } from "../services/models/fechamentoModel";

export const useFechamentos = () => {
  const [fechamentos, setFechamentos] = useState<Fechamento[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFechamentos = async () => {
      try {
        const data = await getFechamentos();
        setFechamentos(data);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchFechamentos();
  }, []);

  const addFechamento = async (fechamento: Fechamento) => {
    try {
      const newFechamento = await createFechamentos(fechamento);
      setFechamentos([...fechamentos, newFechamento]);
    } catch (error: any) {
      setError(error);
    }
  };

  const editFechamento = async (
    id: number,
    fechamento: Partial<Fechamento>
  ) => {
    try {
      const updatedFechamento = await updateFechamento(id, fechamento);
      setFechamentos(
        fechamentos.map((f) =>
          f.id_Fechamentos === id ? updatedFechamento : f
        )
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const removeFechamento = async (id: number) => {
    try {
      await deleteFechamento(id);
      setFechamentos(fechamentos.filter((f) => f.id_Fechamentos !== id));
    } catch (error: any) {
      setError(error);
    }
  };

  return {
    fechamentos,
    error,
    addFechamento,
    editFechamento,
    removeFechamento,
  };
};
