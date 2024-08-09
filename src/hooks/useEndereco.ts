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

  const createEndereco = async (data: Endereco): Promise<number | null> => {
    setError(null);
    try {
      const createdEndereco = await createEnderecos(data);
      if (createdEndereco && createdEndereco.id_Endereco) {
        return createdEndereco.id_Endereco;
      } else {
        throw new Error("ID do endereço não retornado");
      }
    } catch (err: any) {
      setError(err.message);
      return null;
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
    createEndereco,
    editEndereco,
    removeEndereco,
  };
};
