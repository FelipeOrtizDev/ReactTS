/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";

import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { Buttons, ButtonsBox } from "../commonStyles";
import { BsClipboardX } from "react-icons/bs";
import { useAcatamentoSubmit } from "../../hooks/useA";
import AcatamentoForm from "../../components/Form/AcatamentoForm";
import { SolicitacaoBase } from "../../services/api/solicitacaoBase";
import { Acatamento } from "../../services/api/acatamentoService";
import { Fechamento } from "../../services/api/fechamentoService";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  acatamento: Acatamento;
  fechamento: Fechamento;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  acatamento,

  onClose,
  onSave,
}) => {
  const { handleSubmit: handleAcatamentoSubmit } = useAcatamentoSubmit();

  const handleSubmitAll = async () => {
    try {
      const acatamentoData = await handleAcatamentoSubmit({
        ...acatamento,
        SB_SolicitacaoBase_id_SolicitacaoBase: solicitacao.id_SolicitacaoBase,
        SB_SolicitacaoBase_SB_Enderecos_id_Endereco:
          solicitacao.SB_Enderecos_id_Endereco,
      });

      const allData = {
        acatamento: acatamentoData,
      };

      onSave(allData);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados, por favor, tente novamente.");
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm solicitacao={solicitacao} />
        <AcatamentoForm
          SB_SolicitacaoBase_id_SolicitacaoBase={solicitacao.id_SolicitacaoBase}
          SB_SolicitacaoBase_SB_Enderecos_id_Endereco={
            solicitacao.SB_Enderecos_id_Endereco
          }
          acatamento={acatamento}
          onSubmit={handleAcatamentoSubmit}
        />
        {/* <FechamentoForm
          fechamento={fechamento}
          onSubmit={handleFechamentoSubmit}
        />
        <SolicitacaoAberturaForm /> */}
        <ButtonsBox>
          <Buttons type="button" onClick={onClose}>
            Fechar <BsClipboardX />
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
