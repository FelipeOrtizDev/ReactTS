import { useState } from "react";
import {
  createFechamentos,
} from "../services/api/fechamentoService";
import { Fechamento } from "../services/models/fechamentoModel";

export const useFechamentoSubmit = () => {
  const [data, setData] = useState<Fechamento | null>(null);

  const handleSubmit = async (formData: Fechamento) => {
    try {
      const response = await createFechamentos(formData);
      setData(response);
      return response;
    } catch (error) {
      console.error("Error submitting Fechamento:", error);
      throw error;
    }
  };

  return {
    data,
    handleSubmit,
  };
};
