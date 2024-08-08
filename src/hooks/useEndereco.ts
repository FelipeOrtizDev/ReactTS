/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  getEnderecos,
  createEnderecos,
  updateEnderecos,
  deleteEnderecos,
} from "../services/api/enderecoService";
import { Endereco } from "../services/models/enderecoModel";

export const useEndereco = () => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const data = await getEnderecos();
        setEnderecos(data);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchEnderecos();
  }, []);

  const addEndereco = async (endereco: Endereco) => {
    try {
      const newEndereco = await createEnderecos(endereco);
      setEnderecos([...enderecos, newEndereco]);
    } catch (error: any) {
      setError(error);
    }
  };

  const editEndereco = async (id: number, endereco: Partial<Endereco>) => {
    try {
      const upatedEndereco = await updateEnderecos(id, endereco);
      setEnderecos(
        enderecos.map((e) => (e.id_Endereco === id ? upatedEndereco : e))
      );
    } catch (error: any) {
      setError(error);
    }
  };

  const removeEndereco = async (id: number) => {
    try {
      await deleteEnderecos(id);
      setEnderecos(enderecos.filter((e) => e.id_Endereco !== id));
    } catch (error: any) {
      setError(error);
    }
  };

  return {
    enderecos,
    error,
    addEndereco,
    editEndereco,
    removeEndereco,
  };
};
