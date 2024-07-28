import { useState } from "react";
import {
  SolicitacaoBase,
  updateSolicitacaoBase,
} from "../services/api/solicitacaoBase";

export const useSolicitacaoBaseSubmit = () => {
  const [data, setData] = useState<SolicitacaoBase | null>(null);

  const handleSubmit = async (id: number, formData: SolicitacaoBase) => {
    try {
      const response = await updateSolicitacaoBase(id, formData);
      setData(response);
      return response;
    } catch (error) {
      console.error("Error updating SolicitacaoBase:", error);
      throw error;
    }
  };

  return {
    data,
    handleSubmit,
  };
};
