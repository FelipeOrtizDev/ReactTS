/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import AcatamentoForm from "../../components/Form/AcatamentoForm";
import SolicitacaoAberturaForm from "../../components/Form/solicitacaoAberturaForm";
import AcatamentoAberturaForm from "../../components/Form/AcatamentoAberturaForm";

import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { SolicitacaoBase } from "../../services/api/solicitacaoBase";
import { SolicitacaoAbertura } from "../../services/api/solicitacaoAberturaService";
import { AcatamentosAbertura } from "../../services/api/acatamentosAberturaService";
import { Acatamento } from "../../services/api/acatamentoService";
interface EditModalProps {
  solicitacao: SolicitacaoBase;
  acatamento: Acatamento;
  solicitacaoAbertura: SolicitacaoAbertura;
  acatamentoAbertura: AcatamentosAbertura;
  onClose: () => void;
  onSave: (updated: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  acatamento,
  solicitacaoAbertura,
  acatamentoAbertura,
  onClose,
  onSave,
}) => {
  // Handlers for each form submission
  const handleSolicitacaoBaseSubmit = async (data: SolicitacaoBase) => {
    try {
      console.log("Solicitação Base:", data);
      // Add logic for handling form submission, e.g., API call
      onSave({ solicitacao: data });
    } catch (error) {
      console.error("Erro ao enviar solicitação base:", error);
    }
  };

  const handleAcatamentoSubmit = async (data: Acatamento) => {
    try {
      console.log("Acatamento:", data);
      // Add logic for handling form submission, e.g., API call
      onSave({ acatamento: data });
    } catch (error) {
      console.error("Erro ao enviar acatamento:", error);
    }
  };

  const handleSolicitacaoAberturaSubmit = async (data: SolicitacaoAbertura) => {
    try {
      console.log("Solicitação Abertura:", data);
      // Add logic for handling form submission, e.g., API call
      onSave({ solicitacaoAbertura: data });
    } catch (error) {
      console.error("Erro ao enviar solicitação abertura:", error);
    }
  };

  const handleAcatamentoAberturaSubmit = async (data: AcatamentosAbertura) => {
    try {
      console.log("Acatamento Abertura:", data);
      // Add logic for handling form submission, e.g., API call
      onSave({ acatamentoAbertura: data });
    } catch (error) {
      console.error("Erro ao enviar acatamento abertura:", error);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm
          solicitacao={solicitacao}
          onSubmit={handleSolicitacaoBaseSubmit}
        />
        <AcatamentoForm
          acatamento={acatamento}
          onSubmit={handleAcatamentoSubmit}
        />
        <SolicitacaoAberturaForm
          solicitacaoAbertura={solicitacaoAbertura}
          onSubmit={handleSolicitacaoAberturaSubmit}
        />
        <AcatamentoAberturaForm
          acatamentoAbertura={acatamentoAbertura}
          onSubmit={handleAcatamentoAberturaSubmit}
        />
        <button type="button" onClick={onClose}>
          Fechar
        </button>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditModal;
