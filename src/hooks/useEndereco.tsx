import { useEffect, useState } from "react";
import {
  getEnderecos,
  createEnderecos,
  updateEnderecos,
  deleteEnderecos,
  Endereco,
} from "../services/api/enderecoService";

export const useEndereco = () => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const data = await getEnderecos();
        setEnderecos(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchEnderecos();
  }, []);

  const addEndereco = async (endereco: Endereco) => {
    try {
      const newEndereco = await createEnderecos(endereco);
      setEnderecos([...enderecos, newEndereco]);
    } catch (error) {
      setError(error);
    }
  };

  const editEndereco = async (id: number, endereco: Partial<Endereco>) => {
    try {
      const upatedEndereco = await updateEnderecos(id, endereco);
      setEnderecos(
        enderecos.map((e) => (e.id_Endereco === id ? upatedEndereco : e))
      );
    } catch (error) {
      setError(error);
    }
  };

  const removeEndereco = async (id: number) => {
    try {
      await deleteEnderecos(id);
      setEnderecos(enderecos.filter((e) => e.id_Endereco !== id));
    } catch (error) {
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
