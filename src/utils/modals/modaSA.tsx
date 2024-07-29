import React from "react";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import AcatamentoForm from "../../components/Form/AcatamentoForm";

import { useAcatamentoSubmit } from "../../hooks/useA";
import { useFormStore } from "../../components/Form/formStore";
import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { Buttons, ButtonsBox } from "../commonStyles";
import { Fechamento } from "../../services/models/fechamentoModel";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  fechamento: Fechamento;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  fechamento,
  onClose,
  onSave,
}) => {
  const { handleSubmit: handleAcatamentoSubmit } = useAcatamentoSubmit();
  const { acatamento } = useFormStore();

  
  const handleSubmitAll = async () => {
    try {
      // Garantir que todos os campos necessários estão definidos
      const acatamentoData = {
        ...acatamento,
        SB_SolicitacaoBase_id_SolicitacaoBase: solicitacao.id_SolicitacaoBase,
        SB_SolicitacaoBase_SB_Enderecos_id_Endereco: solicitacao.SB_Enderecos_id_Endereco,
      };

      console.log("Dados de Acatamento antes do envio:", acatamentoData);

      if (!acatamentoData.SB_DataAcatamento || !acatamentoData.SB_PrevisaoAcatamento || !acatamentoData.SB_EquipeResponsavel) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }

      const response = await handleAcatamentoSubmit(acatamentoData);

      console.log("Resposta do servidor:", response);

      onSave({ acatamento: response });
    } catch (error) {
      console.error("Erro ao enviar acatamento:", error);
      alert("Erro ao enviar dados, por favor, tente novamente.");
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm solicitacao={solicitacao} />
        <AcatamentoForm
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          enderecoId={solicitacao.SB_Enderecos_id_Endereco}
        />
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