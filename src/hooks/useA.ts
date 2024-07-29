import { useState } from "react";
import { createAcatamento } from "../services/api/acatamentoService";
import { Acatamento } from "../services/models/acatamentoModel";

export const useAcatamentoSubmit = () => {
  const [data, setData] = useState<Acatamento | null>(null);

  const handleSubmit = async (formData: Acatamento) => {
    try {
      console.log("Enviando dados para a API:", formData);
      const response = await createAcatamento(formData);
      setData(response);
      console.log("Resposta da API:", response);
      return response;
    } catch (error) {
      console.error("Error creating Acatamento:", error);
      throw error;
    }
  };

  return {
    data,
    handleSubmit,
  };
};