/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import AcatamentoForm from "../../components/Form/AcatamentoForm";
/* import SolicitacaoAberturaForm from "../../components/Form/solicitacaoAberturaForm"; */
import FechamentoForm from "../../components/Form/fechamentoForm";

import { SolicitacaoBase } from "../../services/api/solicitacaoBase";
import { SolicitacaoAbertura } from "../../services/api/solicitacaoAberturaService";
import { Acatamento } from "../../services/api/acatamentoService";
import { Fechamento } from "../../services/api/fechamentoService";

import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { Buttons, ButtonsBox } from "../commonStyles";
import { AcatamentosAbertura } from "../../services/api/acatamentosAberturaService";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  acatamento: Acatamento;
  solicitacaoAbertura: SolicitacaoAbertura;
  acatamentoAbertura: AcatamentosAbertura;
  fechamento: Fechamento;
  onClose: () => void;
  onSave: (updated: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  onClose,
  onSave,
}) => {
  const solicitacaoBaseSubmit = useRef<() => Promise<void>>();
  const acatamentoSubmit = useRef<() => Promise<void>>();
  const solicitacaoAberturaSubmit = useRef<() => Promise<void>>();
  const fechamentoSubmitRef = useRef<{ submit: () => Promise<void> }>(null);

  const handleSolicitacaoBaseSubmit = async (data: SolicitacaoBase) => {
    console.log(data);
    onSave({ solicitacao: data });
  };

  const handleAcatamentoSubmit = async (data: Acatamento) => {
    console.log(data);
    onSave({ acatamento: data });
  };
  /* const handleSolicitacaoAberturaSubmit = async (
    data: CombinedSolicitacaoAbertura
  ) => {
    onSave({
      solicitacaoAbertura: {
        SB_DataAbertura: data.SB_DataAbertura,
        SB_HoraAbertura: data.SB_HoraAbertura,
        SB_HNMotivo: data.SB_HNMotivo,
        SB_HNObservações: data.SB_HNObservações,
      },
      acatamentoAbertura: {
        SB_DataAcatamentoAbertura: data.SB_DataAcatamentoAbertura,
        SB_EquipeResponsavelAbertura: data.SB_EquipeResponsavelAbertura,
        SB_PrevisãoAcatamentoAbertura: data.SB_PrvisãoAcatamentoAbertura,
        SB_ObservacaoAcatamentoAbertura: data.SB_ObservacaoAcatamentoAbertura,
      },
    });
  }; */
  const handleFechamentoSubmit = async (data: Fechamento) => {
    onSave({ fechamento: data });
  };

  const handleSubmitAll = async () => {
    try {
      if (solicitacaoBaseSubmit.current) await solicitacaoBaseSubmit.current();
      if (acatamentoSubmit.current) await acatamentoSubmit.current();
      if (solicitacaoAberturaSubmit.current)
        await solicitacaoAberturaSubmit.current();
      if (fechamentoSubmitRef.current) {
        console.log("Submetendo Fechamento:");
        await fechamentoSubmitRef.current.submit();
      }
      alert("All data submitted successfully!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados, por favor, tente novamente.");
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm
          solicitacao={solicitacao}
          onSubmit={handleSolicitacaoBaseSubmit}
          setSubmitRef={solicitacaoBaseSubmit}
        />
        <AcatamentoForm
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          onSubmit={handleAcatamentoSubmit}
        />
        <FechamentoForm
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          onSubmit={handleFechamentoSubmit}
          setSubmitRef={fechamentoSubmit}
        />
        {/* <SolicitacaoAberturaForm
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          onSubmit={handleSolicitacaoAberturaSubmit}
        /> */}
        <ButtonsBox>
          <Buttons type="button" onClick={onClose}>
            Cancelar
          </Buttons>
          <Buttons type="button" onClick={handleSubmitAll}>
            Salvar Tudo
          </Buttons>
        </ButtonsBox>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditModal;
