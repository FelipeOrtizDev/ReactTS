/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import AcatamentoForm from "../../components/Form/AcatamentoForm";
import { useAcatamentoSubmit } from "../../hooks/useA";
import { useFechamentoStore } from "../../components/Form/Stores/formfechamentoStore";
import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { Buttons, ButtonsBox } from "../commonStyles";
import { Fechamento } from "../../services/models/fechamentoModel";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import FechamentoForm from "../../components/Form/fechamentoForm";
import SolicitacaoAberturaForm from "../../components/Form/Stores/formfechamentoStore";
import { Acatamento } from "../../services/models/acatamentoModel";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  onClose,
  onSave,
}) => {
  const { fechamentos } = useFechamentoStore();
  const { acatamentos } = useAcatamentoStore();

  const fechamento = fechamentos[solicitacao.id_SolicitacaoBase] || {
    SB_SolicitacaoBase_id_SolicitacaoBase: solicitacao.id_SolicitacaoBase,
  };

  const acatamento = acatamentos[solicitacao.id_SolicitacaoBase] || {
    SB_SolicitacaoBase_id_SolicitacaoBase: solicitacao.id_SolicitacaoBase,
  };
  const handleSaveSolicitacao = (data: SolicitacaoBase) => {
    onSave({ ...data, fechamento, acatamento });
  };

  const handleSaveFechamento = (data: Fechamento) => {
    onSave({ ...solicitacao, fechamento: data, acatamento });
  };

  const handleSaveAcatamento = (data: Acatamento) => {
    onSave({ ...solicitacao, fechamento, acatamento: data });
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm
          solicitacao={solicitacao}
          onSubmit={handleSaveSolicitacao}
        />
        {/* <AcatamentoForm
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          acatamento={acatamento}
          onSubmit={handleSaveAcatamento}
        /> */}
        <FechamentoForm
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          fechamento={fechamento}
          onSubmit={handleSaveFechamento}
        />
        {/*  <SolicitacaoAberturaForm
          solicitacaoAbertura={solicitacaoAbertura}
          acatamentosAbertura={acatamentoAbertura}
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          enderecoId={solicitacao.SB_Enderecos_id_Endereco}
          onSubmit={(data) => {
            console.log("Dados do formulário de Solicitação de Abertura enviados:", data);
          }}
        /> */}
        <ButtonsBox>
          <Buttons type="button" onClick={onClose}>
            Fechar
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
