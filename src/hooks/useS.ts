import { useState } from "react";
import { SolicitacaoAbertura } from "../../src/services/models/solicitacaoAberturaModel";
import { createSolicitacaoAbertura } from "../services/api/solicitacaoAberturaService";
import { AcatamentosAbertura } from "../services/models/acatamentoAberturaModel";
import { createAcatamentosAbertura } from "../services/api/Acatamento/acatamentosAberturaService";

export const useSolicitacaoAberturaSubmit = () => {
  const [data, setData] = useState<SolicitacaoAbertura | null>(null);

  const handleSubmit = async (formData: SolicitacaoAbertura, acatamentoAberturaData: AcatamentosAbertura) => {
    try {
      console.log("Enviando dados para a API:", formData, acatamentoAberturaData);

      const solicitacaoResponse = await createSolicitacaoAbertura(formData);
      const acatamentoResponse = await createAcatamentosAbertura(acatamentoAberturaData);
      
      setData(solicitacaoResponse);
      console.log("Resposta da API:", solicitacaoResponse, acatamentoResponse);

      return { solicitacaoResponse, acatamentoResponse };
    } catch (error) {
      console.error("Erro ao criar solicitação de abertura ou acatamento:", error);
      throw error;
    }
  };

  return {
    data,
    handleSubmit,
  };
};
