import { useState } from "react";
import {
  Fechamento,
  createFechamentos,
} from "../services/api/fechamentoService";

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
