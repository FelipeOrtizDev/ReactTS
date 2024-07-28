import { useState } from "react";
import {
  Acatamento,
  createAcatamento,
} from "../services/api/acatamentoService";

export const useAcatamentoSubmit = () => {
  const [data, setData] = useState<Acatamento | null>(null);

  const handleSubmit = async (formData: Acatamento) => {
    try {
      const response = await createAcatamento(formData);
      setData(response);
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
